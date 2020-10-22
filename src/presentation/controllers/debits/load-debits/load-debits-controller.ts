import { Controller, HttpRequest, HttpResponse,LoadDebits } from './load-debits-protocols'
import { ok,serverError, noContent } from '../../../helpers/http/http-helpers'
export class LoadDebitsController implements Controller {
  constructor (private readonly loadDebits: LoadDebits) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const debits = await this.loadDebits.load()
      if (debits.length > 0) {
        return ok(debits)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
