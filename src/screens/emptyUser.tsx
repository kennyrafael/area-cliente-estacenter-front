import React from 'react'
import { useLocation } from 'react-router-dom'
import { Alert, Button, Card, Col, Row } from 'react-bootstrap'

export const EmptyUser: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let message = ''
  if (queryParams.has('failed')) {
    queryParams.delete('failed')
    message =
      'Desculpe, não foi possível validar os seus dados, verifique o email enviado ou entre em contato com  administração Estacenter 43 - 3376-1300'
  }

  return (
    <Row>
      <Col xs={12}>
        {message && <Alert className={'mt-3'} variant={'danger'}>{message}</Alert>}
      </Col>
      <Col xs={12} md={6}>
        <Card className="text-center mt-5">
          <Card.Body>
            <Card.Title>Cliente Estacenter</Card.Title>

            <Card.Subtitle className="mt-2 mb-4">
              Se você já é cliente estacenter, clique no botão abaixo para que
              possamos validar as suas informações:
            </Card.Subtitle>
            <Button href="/identificao" variant="warning">
              Sou Cliente
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card className="text-center mt-5">
          <Card.Body>
            <Card.Title>Novo Cliente</Card.Title>
            <Card.Subtitle className="mt-2 mb-4">
              Se você quer ser um mensalista em uma de nossas unidades
              Estacenter, clique aqui para se cadastrar:
            </Card.Subtitle>
            <Button href="/cadastro" variant="warning">
              Cadastrar
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
