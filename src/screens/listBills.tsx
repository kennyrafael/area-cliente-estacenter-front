import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaDownload } from 'react-icons/fa'
import dataService from '../service/data.service'
import { StoreState, updateLoading, addUser } from '../store'
import { IUser } from '../types'
import { ITitulo } from '../types/titulo'
import { AppConstants } from '../constants'

export const ListBills: React.FC = () => {
  const [reload] = useState(false)
  const dispatch = useDispatch()

  const toggleLoading = (status: boolean) => {
    dispatch(updateLoading(status))
  }

  const user: IUser | null = useSelector(
    (storeState: StoreState) => storeState.user
  )

  const loadUser = async () => {
    toggleLoading(true)
    try {
      const document = localStorage.getItem('document')
      if (document) {
        const userData = await dataService.getUser(document)
        dispatch(addUser(userData.data))
      }
      toggleLoading(false)
    } catch (e) {
      toggleLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [reload])

  return (
    <React.Fragment>
      <Row className="mt-4 mb-2">
        <Breadcrumb>
          <Breadcrumb.Item>
            <h4>Meus Boletos</h4>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row className="gx-1">
        {user &&
          user.titulos.map((t: ITitulo, i) => {
            return (
              <Card key={i} className="mb-2">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between">
                    {t.obsTcr}
                    <Button
                      target="_blank"
                      variant="warning"
                      href={`${AppConstants.BACK_END_ADDRESS}get-pdf?codEmp=${t.codEmp}&codFil=${t.codFil}&codTpt=${t.codTpt}&numTit=${t.numTit}`}
                    >
                      <FaDownload /> Download
                    </Button>
                  </Card.Title>
                  <Card.Text>
                    Emitido em: {t.datEmi} <br />
                    Vencimento: {t.vctPro}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
      </Row>
    </React.Fragment>
  )
}
