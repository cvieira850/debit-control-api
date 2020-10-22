import { DebitModel } from './db-load-debits-protocols'
import { LoadDebitsRepository } from '../../protocols/debit/load-debits-repository'
import { DbLoadDebits } from './db-load-debits'

const makeFakeDebits = (): DebitModel[] => (
  [
    {
      id: 2,
      clientId: 'any_clientId',
      reason: 'any_reason',
      date: 'any_date',
      value: 'any_value'
    },
    {
      id: 3,
      clientId: 'any_clientId',
      reason: 'any_reason',
      date: 'any_date',
      value: 'any_value'
    }
  ])

const makeLoadDebits = (): LoadDebitsRepository => {
  class LoadDebitsRepositoryStub implements LoadDebitsRepository {
    async load (): Promise<DebitModel[]> {
      return new Promise(resolve => resolve(makeFakeDebits()))
    }
  }
  return new LoadDebitsRepositoryStub()
}
interface SutTypes {
  sut: DbLoadDebits
  loadDebitsRepositoryStub: LoadDebitsRepository
}

const makeSut = (): SutTypes => {
  const loadDebitsRepositoryStub = makeLoadDebits()
  const sut = new DbLoadDebits(loadDebitsRepositoryStub)
  return {
    sut,
    loadDebitsRepositoryStub
  }
}
describe('DbLoadDebits Usecase', () => {
  test('Should call LoadDebitsRepository with no value', async () => {
    const { sut, loadDebitsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadDebitsRepositoryStub,'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledWith()
  })

  test('Should return an array of debits on success', async () => {
    const { sut } = makeSut()
    const debits = await sut.load()
    expect(debits).toEqual(makeFakeDebits())
  })

  test('Should trhow if LoadDebitByIdRepository throws', async () => {
    const { sut, loadDebitsRepositoryStub } = makeSut()
    jest.spyOn(loadDebitsRepositoryStub,'load').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
