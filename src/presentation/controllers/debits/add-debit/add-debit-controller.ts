import { AddDebit, Controller, HttpResponse, HttpRequest,LoadClientById } from './add-debit-protocols'
import { serverError,ok, badRequest } from '../../../helpers/http/http-helpers'
import { ServerError, InvalidParamError } from '../../../errors'
export class AddDebitController implements Controller {
  constructor (
    private readonly addDebit: AddDebit,
    private readonly loadClientById: LoadClientById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const client = await this.loadClientById.load(httpRequest.body.clientId)
      if (client) {
        const debit = await this.addDebit.add(httpRequest.body)
        return ok(debit)
      }
      return badRequest(new InvalidParamError('clientId'))
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
