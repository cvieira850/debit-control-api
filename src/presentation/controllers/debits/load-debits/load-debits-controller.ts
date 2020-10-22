import { Controller, HttpRequest, HttpResponse,LoadDebits } from './load-debits-protocols'
import { ok,serverError } from '../../../helpers/http/http-helpers'
export class LoadDebitsController implements Controller {
  constructor (private readonly loadDebits: LoadDebits) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const debits = await this.loadDebits.load()
      console.log()
      return ok(debits)
    } catch (error) {
      return serverError(error)
    }
  }
}
