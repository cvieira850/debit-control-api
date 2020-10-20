import { Controller,HttpRequest, HttpResponse, LoadDebitById } from './load-debit-by-id-protocols'
import { serverError, ok } from '../../../helpers/http/http-helpers'

export class LoadDebitByIdController implements Controller {
  constructor (private readonly loadDebitById: LoadDebitById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const debit = await this.loadDebitById.load(httpRequest.params.debitId)
      return ok(debit)
    } catch (error) {
      return serverError(error)
    }
  }
}
