import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import {
  Form,
  Button,
  Col,
  Row,
  Card,
  Popover,
  PopoverBody,
} from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'
import NumberFormat from 'react-number-format'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import {
  StepperButton,
  StepperButtonData,
} from '../components/stepper/stepperButton'
import { StepperFooter } from '../components/stepper/stepperFooter'
import dataService from '../service/data.service'
import { ILocale } from '../types/locale'
import ListLocales from '../components/listLocales'
import { useValidation } from '../hooks/useValidation'
import { updateLoading } from '../store'
import { useDispatch } from 'react-redux'
import { MessageModal } from '../components/messageModal'

export interface Mensalist {
  nomCli: string
  cpfCnpj: string
  endCli: string
  nenCli: string
  baiCli: string
  cidCli: string
  cplCli: string
  estCli: string
  fonCli: string
  fonCl2: string
  fonCl3: string
  emaCli: string
  desLoc: string
  plaCli: string
  indiCli: string
  nomPla: 'CARRO' | 'MOTO'
  cepCli: string
  tipCli: 'F' | 'J'
}

const steps: StepperButtonData[] = [
  {
    id: 1,
    title: 'Início',
    separator: true,
  },
  {
    id: 2,
    title: 'Contato',
    separator: true,
  },
  {
    id: 3,
    title: 'Endereço',
    separator: true,
  },
  {
    id: 4,
    title: 'Unidade',
    separator: false,
  },
]

const classClose = 'content'
const classActive = 'content active'

export const CreateMensalist: React.FC = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [locales, updateLocales] = useState<ILocale[]>([])
  const [finished, updateFinished] = useState(false)
  const [citiesArray, updateCitiesArray] = useState<string[]>([])
  const [selectedCity, updateCity] = useState('')
  const [validation, updateValidation] = useState({
    step1: true,
    step2: true,
    step3: true,
    step4: false,
  })
  const [localesFiltered, updateLocalesFiltered] = useState<ILocale[]>([])
  const [search, updateSearch] = useState('')

  useEffect(() => {
    if (locales.length === 0) loadLocales()
  }, [locales])

  const handleUpdateSelectedCity = (e: FormEvent<HTMLSelectElement>) => {
    const city = (e.target as HTMLSelectElement).value
    updateCity(city)
    updateLocalesList(city)
  }

  const handleSearch = useCallback(
    (value: string) => {
      updateSearch(value)
      const term = search.toLowerCase()
      const newList = locales.filter((l) => {
        const values = Object.values(l)
        let match = false
        values.map((v) => {
          if (v.toString().toLowerCase().indexOf(term) > -1) {
            match = true
          }
        })
        return match
      })
      updateLocalesFiltered(newList)
    },
    [search, locales]
  )

  const updateLocalesList = (city: string) => {
    const newList = locales.filter((l) => {
      const values = Object.values(l)
      const term = city.toLowerCase()
      let match = false
      values.forEach((v) => {
        if (v.toString().toLowerCase().indexOf(term) > -1) {
          match = true
        }
      })
      return match
    })
    updateLocalesFiltered(newList)
  }

  const loadLocales = async () => {
    try {
      const document = localStorage.getItem('document')
      if (document) {
        const userData = await dataService.getLocales()
        const list = userData.data.locais.sort((a, b) => a.codFil - b.codFil)
        updateLocales(list)
        const cities = new Set(list.map((l) => l.cidLoc))
        updateCitiesArray(
          Array.from(cities).sort(
            (a, b) =>
              +(a.toLocaleLowerCase() > b.toLocaleLowerCase()) ||
              -(a.toLocaleLowerCase() < b.toLocaleLowerCase())
          )
        )
        updateLocalesFiltered(list)
      }
    } catch (e) {
      console.error('Erro ao buscar locais')
    }
  }

  const handleOnSelect = (locale: string) => {
    if (locale === '') {
      updateCity('')
    }
    const selectedLocale = locales.find((l) => l.desLoc === locale)
    if (selectedLocale) {
      updateLocalesFiltered([selectedLocale])
    } else {
      handleSearch(search)
    }
    handleOnChange({
      ...newMensalist,
      desLoc: locale,
    })
  }

  const [currentStep, updateCurrentStep] = useState<StepperButtonData>(steps[0])
  const [newMensalist, updateMensalist] = useState<Mensalist>({
    nomCli: '',
    cpfCnpj: '',
    endCli: '',
    nenCli: '',
    baiCli: '',
    cidCli: '',
    cplCli: '',
    estCli: '',
    fonCli: '',
    fonCl2: '',
    fonCl3: '',
    emaCli: '',
    desLoc: '',
    plaCli: '',
    indiCli: '',
    nomPla: 'CARRO',
    cepCli: '',
    tipCli: 'F',
  })

  const handleOnChange = (mensalist: Mensalist) => {
    updateMensalist(mensalist)
    runValidation(mensalist)
  }

  const { validateStep1, validateStep2, validateStep3, validateStep4 } =
    useValidation()

  const runValidation = (mensalist: Mensalist) => {
    // updateValidation({
    //   step1: true,
    //   step2: true,
    //   step3: true,
    //   step4: true,
    // })
    updateValidation({
      step1: validateStep1(mensalist),
      step2: validateStep2(mensalist),
      step3: validateStep3(mensalist),
      step4: validateStep4(mensalist),
    })
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toggleLoading(true)
    try {
      await dataService.submitNewMontlyClient(newMensalist)
      toggleLoading(false)
      updateFinished(true)
    } catch (e) {
      console.error('Erro ao realizar cadastro')
      toggleLoading(false)
    }
  }

  const toggleLoading = (status: boolean) => {
    dispatch(updateLoading(status))
  }

  return (
    <Card
      bg={finished ? 'success' : ''}
      text={finished ? 'white' : 'dark'}
      className="mt-3"
    >
      <Card.Body>
        <Card.Title>Cadastrar Novo Mensalista</Card.Title>
        <Card.Subtitle>
          {finished
            ? 'O seu cadastro foi realizado com sucesso. Agora é só aguardar a nossa equipe entrar em contato!'
            : 'Preencha os Campos Abaixo'}
        </Card.Subtitle>
        <Form
          onSubmit={(e) => handleOnSubmit(e)}
          className={finished ? 'd-none' : 'mt-4'}
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
                  currentStep.id === 1 && !finished ? classActive : classClose
                }
              >
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-3" controlId="nomCli">
                      <Form.Label>Nome *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            nomCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={8}>
                    <Form.Group
                      className="mb-3"
                      style={{ marginTop: '38px' }}
                      controlId="nomPla"
                    >
                      <Form.Check
                        inline
                        label="Carro"
                        name="nomPla"
                        type="radio"
                        value="CARRO"
                        defaultChecked={newMensalist.nomPla === 'CARRO'}
                        onClick={() =>
                          handleOnChange({
                            ...newMensalist,
                            nomPla: 'CARRO',
                            cpfCnpj: '',
                          })
                        }
                      />
                      <Form.Check
                        inline
                        label="Moto"
                        name="nomPla"
                        type="radio"
                        value="MOTO"
                        defaultChecked={newMensalist.nomPla === 'MOTO'}
                        onClick={() =>
                          handleOnChange({
                            ...newMensalist,
                            nomPla: 'MOTO',
                            cpfCnpj: '',
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={4}>
                    {newMensalist.tipCli === 'F' && (
                      <Form.Group className="mb-3" controlId="cpfCnpj">
                        <Form.Label>CPF *</Form.Label>
                        <NumberFormat
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange({
                              ...newMensalist,
                              cpfCnpj: e.target.value,
                            })
                          }
                          type="text"
                          customInput={Form.Control}
                          format="###.###.###-##"
                          mask=""
                        />
                      </Form.Group>
                    )}
                    {newMensalist.tipCli === 'J' && (
                      <Form.Group className="mb-3" controlId="cpfCnpj">
                        <Form.Label>CNPJ *</Form.Label>
                        <NumberFormat
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange({
                              ...newMensalist,
                              cpfCnpj: e.target.value,
                            })
                          }
                          type="text"
                          customInput={Form.Control}
                          format="##.###.###/####-##"
                          mask=""
                        />
                      </Form.Group>
                    )}
                  </Col>
                  <Col xs={6} md={8}>
                    <Form.Group
                      className="mb-3"
                      style={{ marginTop: '38px' }}
                      controlId="tipCli"
                    >
                      <Form.Check
                        inline
                        label="Pessoa Física"
                        name="tipCli"
                        type="radio"
                        value="F"
                        defaultChecked={newMensalist.tipCli === 'F'}
                        onClick={() =>
                          handleOnChange({
                            ...newMensalist,
                            tipCli: 'F',
                            cpfCnpj: '',
                          })
                        }
                      />
                      <Form.Check
                        inline
                        label="Pessoa Jurídica"
                        name="tipCli"
                        type="radio"
                        value="J"
                        defaultChecked={newMensalist.tipCli === 'J'}
                        onClick={() =>
                          handleOnChange({
                            ...newMensalist,
                            tipCli: 'J',
                            cpfCnpj: '',
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-3" controlId="plaCli">
                      <Form.Label>
                        Placa do veículo * &nbsp;
                        <FaInfoCircle
                          style={{ cursor: 'pointer' }}
                          onClick={handleShow}
                        />
                        <MessageModal
                          show={show}
                          message={
                            'Cadastro da 1° placa, caso tenha mais placas favor enviar email para contato@estacenter.com'
                          }
                          onHide={handleClose}
                        />
                      </Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            plaCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-3" controlId="indiCli">
                      <Form.Label>
                        Indicação &nbsp;
                        <FaInfoCircle
                          style={{ cursor: 'pointer' }}
                          onClick={handleShow}
                        />
                        <MessageModal
                          show={show}
                          message={
                            'Nome da pessoa que te indicou a Estacenter'
                          }
                          onHide={handleClose}
                        />
                      </Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            indiCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <StepperFooter
                  validation={validation.step1}
                  dataNext={steps[1]}
                  onClick={(data) => updateCurrentStep(data)}
                />
              </div>
              <div
                id="stepper-2"
                className={
                  currentStep.id === 2 && !finished ? classActive : classClose
                }
              >
                <Row>
                  <Col xs={8} md={4}>
                    <Form.Group className="mb-3" controlId="emaCli">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            emaCli: e.target.value,
                          })
                        }
                        type="email"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-3" controlId="fonCli">
                      <Form.Label>Celular *</Form.Label>
                      <NumberFormat
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            fonCli: e.target.value,
                          })
                        }
                        type="text"
                        customInput={Form.Control}
                        format="(##) #####-####"
                        mask=""
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-3" controlId="fonCl2">
                      <Form.Label>Fone Secundário</Form.Label>
                      <NumberFormat
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            fonCl2: e.target.value,
                          })
                        }
                        type="text"
                        customInput={Form.Control}
                        format="(##) #####-####"
                        mask=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <StepperFooter
                  validation={validation.step2}
                  dataPrev={steps[0]}
                  dataNext={steps[2]}
                  onClick={(data) => updateCurrentStep(data)}
                />
              </div>
              <div
                id="stepper-3"
                className={
                  currentStep.id === 3 && !finished ? classActive : classClose
                }
              >
                <Row>
                  <Col xs={8} md={4}>
                    <Form.Group className="mb-3" controlId="endCli">
                      <Form.Label>Endereço *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            endCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={2}>
                    <Form.Group className="mb-3" controlId="nenCli">
                      <Form.Label>Número *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            nenCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-3" controlId="baiCli">
                      <Form.Label>Bairro *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            baiCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={2}>
                    <Form.Group className="mb-3" controlId="cepCli">
                      <Form.Label>CEP *</Form.Label>
                      <NumberFormat
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            cepCli: e.target.value,
                          })
                        }
                        type="text"
                        customInput={Form.Control}
                        format="#####-###"
                        mask=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8} md={5}>
                    <Form.Group className="mb-3" controlId="cplCli">
                      <Form.Label>Complemento</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            cplCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-3" controlId="cidCli">
                      <Form.Label>Cidade *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            cidCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-3" controlId="estCli">
                      <Form.Label>Estado *</Form.Label>
                      <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChange({
                            ...newMensalist,
                            estCli: e.target.value,
                          })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <StepperFooter
                  validation={validation.step3}
                  dataPrev={steps[1]}
                  dataNext={steps[3]}
                  onClick={(data) => updateCurrentStep(data)}
                />
              </div>
              <div
                id="stepper-4"
                className={
                  currentStep.id === 4 && !finished ? classActive : classClose
                }
              >
                <Row>
                  {newMensalist.desLoc === '' && (
                    <React.Fragment>
                      <Col xs={8}>
                        <Form.Group className="mb-3" controlId="estCli">
                          <Form.Select
                            onChange={(e): void => {
                              handleUpdateSelectedCity(e)
                            }}
                            aria-label="Selecione uma cidade..."
                          >
                            <option>Selecione uma cidade...</option>
                            {citiesArray.map((l) => (
                              <option value={l}>{l}</option>
                            ))}
                          </Form.Select>
                          {/* <Form.Group className="mb-3" controlId="estCli">
                          <InputGroup>
                            <InputGroup.Text>Filtrar...</InputGroup.Text>
                            <Form.Control
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleSearch(e.target.value)}
                              value={search}
                              type="text"
                            />
                          </InputGroup> */}
                        </Form.Group>
                      </Col>
                      <Col xs={4}></Col>
                    </React.Fragment>
                  )}
                  <Col xs={12}>
                    {selectedCity && (
                      <ListLocales
                        selected={newMensalist.desLoc}
                        onSelect={(value) => handleOnSelect(value)}
                        list={localesFiltered}
                      />
                    )}
                  </Col>
                </Row>
                {newMensalist.desLoc === '' && (
                  <StepperFooter
                    validation={validation.step4}
                    dataPrev={steps[2]}
                    onClick={(data) => updateCurrentStep(data)}
                  />
                )}
                {newMensalist.desLoc !== '' && (
                  <Row className="d-fles justify-content-center">
                    <Col xs={6} md={3}>
                      <Button className="mt-5" variant="dark" type="submit">
                        Finalizar Cadastro!
                      </Button>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
