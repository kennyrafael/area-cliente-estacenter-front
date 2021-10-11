import { Container, Spinner } from 'react-bootstrap'

export const Loading: React.FC = () => {
  return (
    <Container className="loading">
      <Spinner animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  )
}
