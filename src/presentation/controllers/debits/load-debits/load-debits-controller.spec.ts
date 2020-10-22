import { LoadDebits,DebitModel, HttpRequest } from './load-debits-protocols'
import { LoadDebitsController } from './load-debits-controller'
import { ok } from '../../../helpers/http/http-helpers'
describe('LoadDebits Controller', () => {
  test('Should return debits if loadDebits succeds', async () => {
    class LoadDebitsStub implements LoadDebits {
      async load (): Promise<DebitModel[]> {
        return [{
          id: 'any_id',
          clientId: 'any_clientId',
          reason: 'any_reason',
          date: 'any_date',
          value: 'any_value'
        }]
      }
    }
    const loadDebitsStub = new LoadDebitsStub()
    const sut = new LoadDebitsController(loadDebitsStub)
    const httpRequest: HttpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok([{
      id: 'any_id',
      clientId: 'any_clientId',
      reason: 'any_reason',
      date: 'any_date',
      value: 'any_value'
    }]))
  })
})
