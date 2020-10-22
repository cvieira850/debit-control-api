import { AddDebitModel, DebitModel, AddDebitRepository, ClientModel,LoadClientByIdRepository } from './db-add-debit-protocols'
import { DbAddDebit } from './db-add-debit'

const makeFakeDebit = (): DebitModel => ({
  id: 2,
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
const makeFakeLoadClientData = (): ClientModel => ({
  id: 'any_clientId',
  name: 'any_name',
  username: 'any_username',
  email: 'any_email@email.com',
  address: {
    street: 'any_street',
    suite: 'any_suite',
    city: 'any_city',
    zipcode: 'any_zipcode',
    geo: {
      lat: 'any_lat' ,
      lng: 'any_lng'
    }
  },
  phone: 'any_phone',
  website: 'any_website',
  company: {
    name: 'any_companyname',
    catchPhrase: 'any_catchphrase',
    bs: 'any_bs'
  }
})
const makeLoadClientByRepository = (): LoadClientByIdRepository => {
  class LoadClientByIdRepositoryStub implements LoadClientByIdRepository {
    async loadById (id: string): Promise<ClientModel> {
      return new Promise(resolve => resolve(makeFakeLoadClientData()))
    }
  }
  return new LoadClientByIdRepositoryStub()
}
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
  loadClientByIdRepositoryStub: LoadClientByIdRepository
}

const makeSut = (): SutTypes => {
  const loadClientByIdRepositoryStub = makeLoadClientByRepository()
  const addDebitRepositoryStub = makeAddDebitRepository()
  const sut = new DbAddDebit(addDebitRepositoryStub,loadClientByIdRepositoryStub)
  return {
    sut,
    addDebitRepositoryStub,
    loadClientByIdRepositoryStub
  }
}

describe('DbAddDebit usecase', () => {
  test('Should call AddDebitRepository with correct values', async () => {
    const { sut, addDebitRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDebitRepositoryStub,'add')
    await sut.add(makeFakeDebitData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeDebitData())
  })

  test('Should throws if AddDebitRepository throws', async () => {
    const { sut,addDebitRepositoryStub } = makeSut()
    jest.spyOn(addDebitRepositoryStub,'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.add(makeFakeDebitData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call  LoadClientByIdRepository with correct values', async () => {
    const { sut,loadClientByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadClientByIdRepositoryStub,'loadById')
    await sut.add(makeFakeDebitData())
    expect(loadSpy).toBeCalledWith('any_clientId')
  })

  test('Should return null if  LoadClientByIdRepository returns null', async () => {
    const { sut,loadClientByIdRepositoryStub } = makeSut()
    jest.spyOn(loadClientByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const debit = await sut.add(makeFakeDebitData())
    expect(debit).toBeNull()
  })

  test('Should return a debit on success', async () => {
    const { sut } = makeSut()
    const debit = await sut.add(makeFakeDebitData())
    expect(debit).toEqual(makeFakeDebit())
  })
})
