import { AddDebitModel, DebitModel, AddDebitRepository } from './db-add-debit-protocols'
import { DbAddDebit } from './db-add-debit'

describe('DbAddDebit usecase', () => {
  test('Should call AddDebitRepository with correct values', async () => {
    class AddDebitRepositoryStub implements AddDebitRepository {
      async add (accountData: AddDebitModel): Promise<DebitModel> {
        return new Promise(resolve => resolve({
          id: 'any_id',
          clientId: 'any_clientId',
          reason: 'any_reason',
          date: 'any_date',
          value: 'any_value'
        }))
      }
    }
    const addDebitRepositoryStub = new AddDebitRepositoryStub()
    const sut = new DbAddDebit(addDebitRepositoryStub)
    const loadSpy = jest.spyOn(addDebitRepositoryStub,'add')
    await sut.add({
      clientId: 'any_clientId',
      reason: 'any_reason',
      date: 'any_date',
      value: 'any_value'
    })
    expect(loadSpy).toHaveBeenCalledWith({
      clientId: 'any_clientId',
      reason: 'any_reason',
      date: 'any_date',
      value: 'any_value'
    })
  })
})
