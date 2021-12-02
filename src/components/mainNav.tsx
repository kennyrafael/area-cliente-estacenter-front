import React from 'react'
import { Container, Nav, Navbar, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store'
import { IUser } from '../types'
import { useHistory } from 'react-router'
import { FaSignOutAlt } from 'react-icons/fa'
import { authHook } from '../hooks/auth';
import { removeUser } from '../store/users/action';

export const MainNav: React.FC = () => {
  const { eraseUser } = authHook()
  const dispatch = useDispatch()
  const history = useHistory()
  const user: IUser | null = useSelector(
    (storeState: StoreState) => storeState.user
  )

  const handleLogOut = () => {
    eraseUser()
    dispatch(removeUser())
    history.push('novo-usuario')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Área do Cliente Estacenter
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user && (
              <Nav.Link as={Link} to="/">
                Boletos Pendentes
              </Nav.Link>
            )}

            {!user && (
              <Nav.Link as={Link} to="/cadastro">
                Novo Cadastro
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          {user && (
            <Navbar.Text>
              Bem vindo(a), {user.nomCli}!
              &nbsp;
              <Badge
              style={{
                cursor: 'pointer'
              }}
              onClick={handleLogOut}
              pill bg="warning">
                <FaSignOutAlt
                  style={{
                    color: 'black'
                  }}
                />
              </Badge>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  )
}
