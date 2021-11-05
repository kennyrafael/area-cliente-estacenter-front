import { Mensalist } from '../screens'

export const useValidation = () => {
  return {
    validateStep1: (formValues: Mensalist): boolean => {
      if (formValues.nomCli === '') return false
      if (formValues.plaCli === '') return false
      if (
        formValues.cpfCnpj === '' ||
        !formValues.cpfCnpj.match(
          /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/
        )
      ) {
        return false
      }
      return true
    },
    validateStep2: (formValues: Mensalist): boolean => {
      if (formValues.fonCli.length < 14) {
        return false
      }
      if (
        formValues.emaCli === '' ||
        !formValues.emaCli.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      ) {
        return false
      }
      return true
    },
    validateStep3: (formValues: Mensalist): boolean => {
      if (formValues.endCli === '') return false
      if (formValues.nenCli === '') return false
      if (formValues.baiCli === '') return false
      if (formValues.cidCli === '') return false
      if (formValues.estCli === '') return false
      if (
        formValues.cepCli === '' ||
        !formValues.cepCli.match(/^\d{5}-\d{3}$/g)
      )
        return false

      return true
    },
    validateStep4: (formValues: Mensalist): boolean => {
      if (formValues.desLoc === '') return false
      return true
    },
  }
}
