import { AddDebit, Controller, HttpResponse, HttpRequest } from './add-debit-protocols'
import { serverError,ok, badRequest } from '../../../helpers/http/http-helpers'
import { ServerError, InvalidParamError } from '../../../errors'
export class AddDebitController implements Controller {
  constructor (
    private readonly addDebit: AddDebit
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const debit = await this.addDebit.add(httpRequest.body)
      if (debit) {
        return ok(debit)
      }
      return badRequest(new InvalidParamError('clientId'))
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
