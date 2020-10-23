import { Controller,HttpRequest,HttpResponse, DeleteDebit } from './delete-debit-protocols'

export class DeleteDebitController implements Controller {
  constructor (private readonly deleteDebit: DeleteDebit) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    await this.deleteDebit.delete(id)
    return null
  }
}
