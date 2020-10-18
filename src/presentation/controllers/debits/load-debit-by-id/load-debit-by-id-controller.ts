import { Controller,HttpRequest, HttpResponse, LoadDebitById } from './load-debit-by-id-protocols'

export class LoadDebitByIdController implements Controller {
  constructor (private readonly loadDebitById: LoadDebitById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadDebitById.load(httpRequest.params.debitId)
    return new Promise(resolve => resolve(null))
  }
}
