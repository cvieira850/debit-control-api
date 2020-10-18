import { LoadDebitByIdController } from './load-debit-by-id-controller'
import { DebitModel, LoadDebitById, HttpRequest } from './load-debit-by-id-protocols'
import { serverError } from '../../../helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    debitId: 'any_debit_id'
  }
})
const makeFakeDebit = (): DebitModel => ({
  id: 'any_debit_id',
  clientId: 'any_clientId',
  reason: 'any_reason',
  date: 'any_date',
  value: 'any_value'
})
const makeLoadDebitById = (): LoadDebitById => {
  class LoadDebitByIdStub implements LoadDebitById {
    async load (id: string): Promise<DebitModel> {
      return new Promise(resolve => resolve(makeFakeDebit()))
    }
  }
  return new LoadDebitByIdStub()
}
interface SutTypes {
  sut: LoadDebitByIdController
  loadDebitByIdStub: LoadDebitById
}

const makeSut = (): SutTypes => {
  const loadDebitByIdStub = makeLoadDebitById()
  const sut = new LoadDebitByIdController(loadDebitByIdStub)
  return {
    sut,
    loadDebitByIdStub
  }
}
describe('LoadDebitById Controller', () => {
  test('Should call LoadDebitById with corrrect id', async () => {
    const { sut,loadDebitByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadDebitByIdStub,'load')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_debit_id')
  })

  test('Should throw if LoadDebitById throws', async () => {
    const { sut,loadDebitByIdStub } = makeSut()
    jest.spyOn(loadDebitByIdStub,'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})