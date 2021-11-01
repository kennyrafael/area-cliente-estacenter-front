import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { IApp, StoreState } from '../store'
import { MainNav } from './mainNav'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Loading } from './loading'
import Login from '../middleware/login'
import { CreateMensalist, ListBills } from '../screens'
import { EmptyUser } from '../screens/emptyUser'
import { Identificacao } from '../screens/identificacao'

export const Layout: React.FC = () => {
  const app: IApp = useSelector((storeState: StoreState) => storeState.app)

  return (
    <BrowserRouter>
      {app.loading && <Loading/>}
      <MainNav />
      <Container>
        <Switch>
          <Route exact path="/">
            <Login key="/">
              <ListBills />
            </Login>
          </Route>
          <Route exact path="/cadastro">
            <CreateMensalist />
          </Route>
          <Route exact path="/novo-usuario">
            <EmptyUser />
          </Route>
          <Route exact path="/identificao">
            <Identificacao />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}
