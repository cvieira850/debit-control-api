import { LoadDebits,DebitModel, HttpRequest } from './load-debits-protocols'
import { LoadDebitsController } from './load-debits-controller'
import { ok } from '../../../helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({ body: {} })

const makeFakeArrayDebits = (): DebitModel[] => ([
  {
    id: 'any_id',
    clientId: 'any_clientId',
    reason: 'any_reason',
    date: 'any_date',
    value: 'any_value'
  },
  {
    id: 'other_id',
    clientId: 'other_clientId',
    reason: 'other_reason',
    date: 'other_date',
    value: 'other_value'
  }
])

const makeLoadDebits = (): LoadDebits => {
  class LoadDebitsStub implements LoadDebits {
    async load (): Promise<DebitModel[]> {
      return makeFakeArrayDebits()
    }
  }
  return new LoadDebitsStub()
}
interface SutTypes {
  sut: LoadDebitsController
  loadDebitsStub: LoadDebits
}
const makeSut = (): SutTypes => {
  const loadDebitsStub = makeLoadDebits()
  const sut = new LoadDebitsController(loadDebitsStub)
  return {
    sut,
    loadDebitsStub
  }
}
describe('LoadDebits Controller', () => {
  test('Should return debits if loadDebits succeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeArrayDebits()))
  })
})
