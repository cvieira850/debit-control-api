import { AddDebitModel, DebitModel, AddDebitRepository } from './db-add-debit-protocols'
import { DbAddDebit } from './db-add-debit'

const makeFakeDebit = (): DebitModel => ({
  id: 'any_id',
  clientId: 'any_clientId',
  reason: 'any_reason',
  date: 'any_date',
  value: 'any_value'
})

const makeFakeDebitData = (): AddDebitModel => ({
  clientId: 'any_clientId',
  reason: 'any_reason',
  date: 'any_date',
  value: 'any_value'
})

const makeAddDebitRepository = (): AddDebitRepository => {
  class AddDebitRepositoryStub implements AddDebitRepository {
    async add (accountData: AddDebitModel): Promise<DebitModel> {
      return new Promise(resolve => resolve(makeFakeDebit()))
    }
  }
  return new AddDebitRepositoryStub()
}

interface SutTypes {
  sut: DbAddDebit
  addDebitRepositoryStub: AddDebitRepository
}

const makeSut = (): SutTypes => {
  const addDebitRepositoryStub = makeAddDebitRepository()
  const sut = new DbAddDebit(addDebitRepositoryStub)
  return {
    sut,
    addDebitRepositoryStub
  }
}

describe('DbAddDebit usecase', () => {
  test('Should call AddDebitRepository with correct values', async () => {
    const { sut, addDebitRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(addDebitRepositoryStub,'add')
    await sut.add(makeFakeDebitData())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeDebitData())
  })
})
