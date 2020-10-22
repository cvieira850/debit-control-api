import { Controller, HttpRequest, HttpResponse,LoadDebits } from './load-debits-protocols'
import { ok } from '../../../helpers/http/http-helpers'

export class LoadDebitsController implements Controller {
  constructor (private readonly loadDebits: LoadDebits) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const debits = await this.loadDebits.load()
    console.log()
    return ok(debits)
  }
}
