import { DebitModel } from './db-load-debits-protocols'
import { LoadDebitsRepository } from '../../protocols/debit/load-debits-repository'
import { DbLoadDebits } from './db-load-debits'

const makeLoadDebits = (): LoadDebitsRepository => {
  class LoadDebitsRepositoryStub implements LoadDebitsRepository {
    async load (): Promise<DebitModel[]> {
      return new Promise(resolve => resolve([]))
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
})
