import { DebitModel } from './db-load-debit-by-id-protocols'
import { LoadDebitByIdRepository } from '../../protocols/debit/load-debit-by-id-repository'
import { DbLoadDebitById } from './db-load-debit-by-id'

describe('DbLoadDebitById usecase', () => {
  test('Should call LoadDebitByIdRepository with correct id', async () => {
    class LoadDebitByIdRepositoryStub implements LoadDebitByIdRepository {
      async loadById (id: string): Promise<DebitModel> {
        return new Promise(resolve => resolve({
          id: 'any_debit_id',
          clientId: 'any_clientId',
          reason: 'any_reason',
          date: 'any_date',
          value: 'any_value'
        }))
      }
    }
    const loadDebitByIdRepositoryStub = new LoadDebitByIdRepositoryStub()
    const sut = new DbLoadDebitById(loadDebitByIdRepositoryStub)
    const loadByIdSpy = jest.spyOn(loadDebitByIdRepositoryStub,'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
