import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { IUser } from '../types'

export const MainNav: React.FC = () => {
  const user: IUser | null = useSelector(
    (storeState: StoreState) => storeState.user
  )

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Área do Cliente Estacenter
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Meus Boletos
            </Nav.Link>

            <Nav.Link as={Link} to="/cadastro">
              Novo Cadastro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>


        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          {user && <Navbar.Text>Bem vindo, {user.nomCli}!</Navbar.Text>}
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  )
}
