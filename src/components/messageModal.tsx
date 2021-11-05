import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const MessageModal: React.FC<{
  message: string
  onHide: () => void
  show: boolean
}> = ({ message, onHide, show }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide} variant="warning">Entendi!</Button>
      </Modal.Footer>
    </Modal>
  )
}
