import { AddDebit, Controller, HttpResponse, HttpRequest } from './add-debit-protocols'

export class AddDebitController implements Controller {
  constructor (private readonly addDebit: AddDebit) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addDebit.add(httpRequest.body)
    return null
  }
}
