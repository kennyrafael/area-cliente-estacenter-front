import React, { ReactElement } from 'react'
import { RouteComponentProps, withRouter, useHistory, useLocation } from 'react-router-dom'
import { Redirect } from 'react-router'
import { authHook } from '../hooks/auth'

type LoginProps = RouteComponentProps & {
  children: ReactElement
}

const Login: React.FC<LoginProps> = (props) => {
  const { hasUserSet, setUser } = authHook()
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const qs = props.location.search
  if (queryParams.has('document')) {
    setUser(qs)
    queryParams.delete('document')
    history.replace({
      search: queryParams.toString(),
    })
  }

  return hasUserSet() ? props.children : <Redirect to="/novo-usuario" />
}

export default withRouter(Login)
