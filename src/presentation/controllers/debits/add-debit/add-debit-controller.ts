import { AddDebit, Controller, HttpResponse, HttpRequest, Validation } from './add-debit-protocols'
import { serverError,ok, badRequest } from '../../../helpers/http/http-helpers'
import { ServerError, InvalidParamError } from '../../../errors'
export class AddDebitController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDebit: AddDebit
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
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
