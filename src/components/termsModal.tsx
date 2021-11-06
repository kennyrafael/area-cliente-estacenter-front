import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const TermsModal: React.FC<{
  onHide: (accept: boolean) => void
  show: boolean
}> = ({ onHide, show }) => {
  const handleClose = (v = false) => {
    onHide(v)
  }
  return (
    <Modal scrollable size={'lg'} show={show} onHide={handleClose}>
      <Modal.Header style={{ textAlign: 'center', display: 'block' }}>
        <b>REGULAMENTO PARA MENSALISTAS</b>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>01.</b> O presente regulamento tem por objetivo expor as normas a
          serem seguidas pelos mensalistas, conforme o disposto abaixo.
        </p>
        <p>
          <b>02.</b> Todo veículo deve estar devidamente cadastrado, para isso o
          mensalista deverá preencher todos os dados desse formulário e qualquer
          alteração cadastral deverá ser comunicada à administração da
          Estacenter.
        </p>
        <p>
          <b>03.</b> O horário de funcionamento do estacionamento deverá ser
          respeitado pelo mensalista, caso haja alguma insistência ou infração,
          o mesmo será notificado e poderá ser excluído do cadastro do
          estacionamento.
        </p>
        <p>
          <b>04.</b> No estacionamento com o sistema Automatizado é
          indispensável o uso do Cartão Mensalista, o não uso ou esquecimento do
          Cartão, implicará no pagamento de estadia rotativo (avulso), conforme
          a tabela de preços vigente.
        </p>
        <p>
          <b>05.</b> Na primeira mensalidade será cobrada uma taxa contratual
          referente à manutenção do cadastro junto à empresa operadora, cujo
          valor será estipulado pela própria contratada.
        </p>
        <p>
          <b>06.</b> Após o recebimento destes dados devidamente preenchido, a
          empresa operadora terá um prazo de até 02 (dois) dias úteis, para
          providenciar o devido cadastramento do novo mensalista.
        </p>
        <p>
          <b>07.</b> O cadastro poderá ser cancelado a qualquer momento, sem
          ônus, tanto para o mensalista como para a empresa operadora até o dia
          10 (dez) do mês anterior ao mês de referência.
        </p>
        <p>
          <b>08.</b> Para mensalistas cadastrados durante o mês, adotamos como
          regra o pagamento proporcional a partir do dia de cadastro mais o
          valor da taxa contratual, este deverá ser efetuado através do
          pagamento do boleto bancário.
        </p>
        <p>
          <b>09.</b> Caso seja solicitado pelo mensalista o cancelamento de seu
          cadastro após o pagamento do boleto bancário de sua mensalidade, não
          haverá restituição de valores.
        </p>
        <p>
          <b>10.</b> A mensalidade é válida do primeiro ao último dia do mês,
          sendo que o pagamento deverá ser efetuado antecipadamente ao uso do
          mês referente.
        </p>
        <p>
          <b>11.</b> O preço da mensalidade poderá ser reajustado a qualquer
          tempo, de acordo com a variação de preços do mercado e podendo ser
          alterado em função da planilha de custos interna da empresa operadora.
        </p>
        <p>
          <b>12.</b> O pagamento da mensalidade deve ser feito através de boleto
          bancário, com vencimento até o dia 01 (um) de cada mês. Os pagamentos
          efetuados após esta data de vencimento do mês de referência serão
          acrescidos de 2% (dois por cento) de multa mais mora diária, como
          também perderá o direito de desconto concedido pela empresa.
        </p>
        <p>
          <b>13.</b> O não pagamento do boleto bancário da mensalidade até o dia
          08 do mês de referência implicará no descadastramento do mensalista,
          além de sofre as penalidades e restrições de seu crédito.
        </p>
        <p>
          <b>14.</b> Em caso de sinistro, somente estarão cobertos pela apólice
          de seguro, os veículos que estiverem devidamente identificados e
          cadastrados no sistema da empresa operadora.
        </p>
        <p>
          <b>15.</b> A responsabilidade da empresa operadora esta limitada aos
          valores e condições especificadas na apólice de seguro do ramo
          “Responsabilidade Civil”, modalidade “Guarda de Veículos de
          Terceiros”.
        </p>
        <p>
          <b>16.</b> Os proprietários que possuírem em seus veículos aparelho de
          CD e/ou DVD do tipo gaveta ou frente removível, e demais objetos
          portáteis, deverão levar os mesmos consigo.
        </p>
        <p>
          <b>17.</b> Eventuais quebras ou defeitos mecânicos no veículo ou em
          objetos portáteis só serão de responsabilidade da empresa operadora
          quando decorrerem comprovadamente de imperícia, imprudência ou
          negligência dos manobristas, constatadas pelo mensalista junto à
          administração do estacionamento, antes da retirada do veículo do
          estacionamento.
        </p>
        <p>
          <b>18.</b> Para os estacionamentos Automatizados a perda ou extravio
          do cartão, implicará numa taxa de R$ 20,00 (Vinte Reais) para
          confecção de segunda via.
        </p>
        <p>
          <b>19.</b> Mensalistas que possuem vaga de motocicleta, caso utilizem
          o estacionamento para vaga de carro, será cobrado conforme a tabela de
          preços vigente fixada no estacionamento. Ao clicar em em enviar
          declaro estar de pleno e total acordo com as instruções e condições
          acima detalhadas.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          style={{ width: '100%' }}
          onClick={() => handleClose(true)}
          variant="warning"
        >
          Aceito os termos!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
