import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

export const EmptyUser: React.FC = () => {
  return (
    <Row>
    <Col xs={6}>
      <Card className="text-center mt-5">
        <Card.Body>
          <Card.Title>Cliente Estacenter</Card.Title>
          <Card.Subtitle className="mt-2 mb-4">
            Se você já é cliente estacenter, clique a qui para se cadastrar na
            Área do Cliente Estacenter:
          </Card.Subtitle>
          <Button href="/cadastro" variant="warning">
            Cadastrar
          </Button>
        </Card.Body>
      </Card>
    </Col>
      <Col xs={6}>
        <Card className="text-center mt-5">
          <Card.Body>
            <Card.Title>Novo Cliente</Card.Title>
            <Card.Subtitle className="mt-2 mb-4">
              Se você quer ser um mensalista em uma de nossas unidades Estacenter, clique aqui para se cadastrar:
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
