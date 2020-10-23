import { Controller,HttpRequest,HttpResponse, DeleteDebit } from './delete-debit-protocols'
import { serverError } from '../../../helpers/http/http-helpers'

export class DeleteDebitController implements Controller {
  constructor (private readonly deleteDebit: DeleteDebit) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.deleteDebit.delete(id)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
