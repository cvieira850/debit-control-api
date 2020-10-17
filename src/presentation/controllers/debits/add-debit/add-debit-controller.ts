import { AddDebit, Controller, HttpResponse, HttpRequest,LoadClientById } from './add-debit-protocols'
import { serverError,ok } from '../../../helpers/http/http-helpers'
import { ServerError } from '../../../errors'
export class AddDebitController implements Controller {
  constructor (
    private readonly addDebit: AddDebit,
    private readonly loadClientById: LoadClientById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadClientById.load(httpRequest.body.clientId)
      const debit = await this.addDebit.add(httpRequest.body)
      return ok(debit)
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
