import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { ILocale } from '../types/locale'

interface ListLocalesProps {
  list: ILocale[]
  onSelect: (locale: string) => void
  selected: string
}

const ListLocales: React.FC<ListLocalesProps> = ({
  list,
  onSelect,
  selected,
}) => {
  if (list.length < 1) {
    return <p>Carregando filiais...</p>
  }

  const handleOnClick = (v: string) => {
    onSelect(v)
  }

  return (
    <Table bordered hover size="sm">
      <tbody>
        {list.map((locale, index) => {
          return (
            <tr key={index}>
              <td className="align-middle">{locale.endLoc}</td>
              <td className="align-middle">{locale.baiLoc}</td>
              <td className="align-middle">
                {locale.cidLoc} - {locale.estLoc}
              </td>
              <td className="d-flex justify-content-center">
                {selected !== locale.desLoc && (
                  <Button
                    onClick={() => handleOnClick(locale.desLoc)}
                    variant="primary"
                  >
                    Selecionar
                  </Button>
                )}
                {selected === locale.desLoc && (
                  <Button
                    onClick={() => handleOnClick('')}
                    variant="warning"
                  >
                    Alterar
                  </Button>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ListLocales
