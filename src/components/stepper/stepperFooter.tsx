import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { StepperButtonData } from './stepperButton'

type StepperFooterProp = {
  dataPrev?: StepperButtonData
  dataNext?: StepperButtonData
  onClick: (step: StepperButtonData) => void
  validation: boolean
}

export const StepperFooter: React.FC<StepperFooterProp> = ({
  dataPrev,
  dataNext,
  onClick,
  validation
}) => {
  return (
    <Row className="d-flex justify-content-center mt-5">
      {dataPrev && (
        <Col xs={3}>
          <Button style={{width: '100%'}} variant="warning" onClick={() => onClick(dataPrev)}>
            Voltar
          </Button>
        </Col>
      )}
      {dataNext && (
        <Col xs={3}>
          <Button disabled={!validation} style={{width: '100%'}} variant="dark" onClick={() => onClick(dataNext)}>
            Próximo
          </Button>
        </Col>
      )}
    </Row>
  )
}
