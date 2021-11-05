import React, { ReactElement, useEffect } from 'react'
import {
  RouteComponentProps,
  withRouter,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Redirect } from 'react-router'
import { authHook } from '../hooks/auth'
import dataService from '../service/data.service'

type LoginProps = RouteComponentProps & {
  children: ReactElement
}

const Login: React.FC<LoginProps> = (props) => {
  const { hasUserSet, setUser, eraseUser } = authHook()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const qs = props.location.search
  let validUser = true

  const checkUser = async () => {
    if (queryParams.has('document')) {
      try {
        const document = localStorage.getItem('document')
        if (document) {
          const userData = await dataService.getUser(document)
          if (!userData.data.emaCli) {
            validUser = false
          }
        }
      } catch (e) {
        validUser = false
      }
      validUser ? setUser(qs) : eraseUser();
    }
  }

  useEffect(() => {
    checkUser()
  })

  return hasUserSet() && validUser ? (
    props.children
  ) : (
    <Redirect to="/novo-usuario?failed=true" />
  )
}

export default withRouter(Login)
