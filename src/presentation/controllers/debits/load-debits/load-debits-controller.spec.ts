import { LoadDebits,DebitModel, HttpRequest } from './load-debits-protocols'
import { LoadDebitsController } from './load-debits-controller'
import { ok, serverError, noContent } from '../../../helpers/http/http-helpers'
import { ServerError } from '../../../errors'

const makeFakeRequest = (): HttpRequest => ({ body: {} })

const makeFakeArrayDebits = (): DebitModel[] => ([
  {
    id: 1,
    clientId: 'any_clientId',
    reason: 'any_reason',
    date: 'any_date',
    value: 'any_value'
  },
  {
    id: 2,
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

  test('Should throw if LoadDebits throws', async () => {
    const { sut, loadDebitsStub } = makeSut()
    jest.spyOn(loadDebitsStub,'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  test('Should retunr 204 if no debit is returned', async () => {
    const { sut, loadDebitsStub } = makeSut()
    jest.spyOn(loadDebitsStub,'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
