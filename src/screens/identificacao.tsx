import React, { useState } from 'react'
import { Form, Button, Col, Row, Card } from 'react-bootstrap'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import {
  StepperButton,
  StepperButtonData,
} from '../components/stepper/stepperButton'
import { StepperFooter } from '../components/stepper/stepperFooter'
import dataService from '../service/data.service'
import { updateLoading } from '../store'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

export interface UserData {
  emaCli: string
  cpfCnpj: string
}

const steps: StepperButtonData[] = [
  {
    id: 1,
    title: '',
    separator: true,
  },
  {
    id: 2,
    title: '',
    separator: true,
  },
]

const classClose = 'content'
const classActive = 'content active'

export const Identificacao: React.FC = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const [validation, updateValidation] = useState({
    step1: false,
    step2: false,
  })

  const [currentStep, updateCurrentStep] = useState<StepperButtonData>(steps[0])
  const [userData, updateUserData] = useState<UserData>({
    emaCli: '',
    cpfCnpj: '',
  })

  const handleChangeCPF = (value: string): void => {
    updateUserData({
      ...userData,
      cpfCnpj: value,
    })

    if ([11, 14].includes(value.length)) {
      updateValidation({
        ...validation,
        step1: true,
      })
      return
    }
    updateValidation({
      ...validation,
      step1: false,
    })
  }

  const handleChangeEmail = (value: string): void => {
    updateUserData({
      ...userData,
      emaCli: value,
    })

    if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      updateValidation({
        ...validation,
        step2: true,
      })
      return
    }
    updateValidation({
      ...validation,
      step2: false,
    })
  }

  const validateCpfCnpj = async () => {
    toggleLoading(true)
    setErrorMessage('')
    try {
      const data = await dataService.checkDocument(userData.cpfCnpj)
      toggleLoading(false)
      if (data.data) {
        updateCurrentStep(steps[1])
        return
      }
      setErrorMessage(
        'Desculpe, não encontramos o seu cadastro, verifique o número do documento enviado!'
      )
    } catch (e) {
      console.error('Erro ao validar cadastro')
      toggleLoading(false)
    }
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toggleLoading(true)
    setErrorMessage('')
    try {
      const { cpfCnpj, emaCli } = userData
      const data = await dataService.checkEmail(cpfCnpj, emaCli)
      toggleLoading(false)
      if (data.data) {
        localStorage.setItem('document', cpfCnpj);
        history.replace('')
        return
      }
      setErrorMessage(
        'Desculpe, não foi possível validar os seus dados, verifique o email enviado!'
      )
    } catch (e) {
      console.error('Erro ao validar cadastro')
      toggleLoading(false)
    }
  }

  const toggleLoading = (status: boolean) => {
    dispatch(updateLoading(status))
  }

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Validar Cliente</Card.Title>
        {errorMessage && (
          <Card.Subtitle className="text-danger">{errorMessage}</Card.Subtitle>
        )}
        <Form
          onSubmit={(e) => handleOnSubmit(e)}
          className="mt-4"
        >
          <div id="stepper" className="bs-stepper">
            <div className="bs-stepper-header">
              {steps.map(
                (s): React.ReactNode => (
                  <StepperButton
                    key={s.id}
                    data={s}
                    active={currentStep.id === s.id}
                  />
                )
              )}
            </div>
            <div className="bs-stepper-content">
              <div
                id="stepper-1"
                className={
                  currentStep.id === 1 ? classActive : classClose
                }
              >
                <Row className="justify-content-center">
                  <Col md={4}>
                    <Form.Group controlId="cpfCnpj">
                      <Form.Label>
                        Digite o seu CPF/CNPJ <small>(somente números)</small>
                      </Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeCPF(e.target.value)
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <StepperFooter
                  validation={validation.step1}
                  dataNext={steps[1]}
                  onClick={(data) => validateCpfCnpj()}
                />
              </div>
              <div
                id="stepper-2"
                className={
                  currentStep.id === 2 ? classActive : classClose
                }
              >
                <Row className="justify-content-center">
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="fonCli">
                      <Form.Label>Email de cadastro</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeEmail(e.target.value)
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={5} md={2}>
                    <Button
                      disabled={!validation.step2}
                      className="mt-5"
                      variant="dark"
                      type="submit"
                    >
                      Validar Email
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
