import { Controller,HttpRequest, HttpResponse, LoadDebitById } from './load-debit-by-id-protocols'
import { serverError, ok } from '../../../helpers/http/http-helpers'

export class LoadDebitByIdController implements Controller {
  constructor (private readonly loadDebitById: LoadDebitById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const debit = await this.loadDebitById.loadById(id)
      return ok(debit)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
