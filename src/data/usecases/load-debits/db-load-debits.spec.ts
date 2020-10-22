import { DebitModel } from './db-load-debits-protocols'
import { LoadDebitsRepository } from '../../protocols/debit/load-debits-repository'
import { DbLoadDebits } from './db-load-debits'

describe('DbLoadDebits Usecase', () => {
  test('Should call LoadDebitsRepository with no value', async () => {
    class LoadDebitsRepositoryStub implements LoadDebitsRepository {
      async load (): Promise<DebitModel[]> {
        return new Promise(resolve => resolve([]))
      }
    }
    const loadDebitsRepositoryStub = new LoadDebitsRepositoryStub()
    const sut = new DbLoadDebits(loadDebitsRepositoryStub)
    const loadSpy = jest.spyOn(loadDebitsRepositoryStub,'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledWith()
  })
})
