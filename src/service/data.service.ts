import { AxiosResponse } from 'axios'
import { IUser } from '../types'
import api from './api'
import { ILocale } from '../types/locale'
import { Mensalist } from '../screens'

class DataService {
  getUser(document: string): Promise<AxiosResponse<IUser>> {
    return api.post('get-titles', {
      cpfCnpj: document,
    })
  }

  getLocales(): Promise<AxiosResponse<{ locais: ILocale[] }>> {
    return api.post('get-locales')
  }

  submitNewMontlyClient(
    clientData: Mensalist
  ): Promise<AxiosResponse<{ msgRet: string; erroExecucao: string }>> {
    return api.post('submit-monthly-client', clientData)
  }
}

export default new DataService()
