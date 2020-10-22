import { DebitModel } from './db-load-debit-by-id-protocols'
import { LoadDebitByIdRepository } from '../../protocols/debit/load-debit-by-id-repository'
import { DbLoadDebitById } from './db-load-debit-by-id'

const makeFakeDebit = (): DebitModel => ({
  id: 2,
  clientId: 'any_clientId',
  reason: 'any_reason',
  date: 'any_date',
  value: 'any_value'
})

const makeLoadDebitByIdRepository = (): LoadDebitByIdRepository => {
  class LoadDebitByIdRepositoryStub implements LoadDebitByIdRepository {
    async loadById (id: string): Promise<DebitModel> {
      return new Promise(resolve => resolve(makeFakeDebit()))
    }
  }
  return new LoadDebitByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadDebitById
  loadDebitByIdRepositoryStub: LoadDebitByIdRepository
}
const makeSut = (): SutTypes => {
  const loadDebitByIdRepositoryStub = makeLoadDebitByIdRepository()
  const sut = new DbLoadDebitById(loadDebitByIdRepositoryStub)
  return {
    sut,
    loadDebitByIdRepositoryStub
  }
}
describe('DbLoadDebitById usecase', () => {
  test('Should call LoadDebitByIdRepository with correct id', async () => {
    const { sut,loadDebitByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadDebitByIdRepositoryStub,'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a debit on success', async () => {
    const { sut } = makeSut()
    const debit = await sut.loadById('any_id')
    expect(debit).toEqual(makeFakeDebit())
  })

  test('Should trhow if LoadDebitByIdRepository throws', async () => {
    const { sut, loadDebitByIdRepositoryStub } = makeSut()
    jest.spyOn(loadDebitByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
