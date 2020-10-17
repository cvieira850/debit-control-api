import { AddDebitController } from './add-debit-controller'
import { AddDebitModel, DebitModel, AddDebit, ClientModel, LoadClientById } from './add-debit-protocols'
import { HttpRequest } from '../../../protocols'
import { serverError, ok, badRequest } from '../../../helpers/http/http-helpers'
import { ServerError, InvalidParamError } from '../../../errors'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    clientId: 'any_clientId',
    reason: 'any_reason',
    date: 'any_date',
    value: 'any_value'
  }
})

const makeFakeDebit = (): DebitModel => ({
  id: 'any_id',
  clientId: 'any_clientId',
  reason: 'any_reason',
  date: 'any_date',
  value: 'any_value'
})

const makeFakeClient = (): ClientModel => ({
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

const makeAddDebit = (): AddDebit => {
  class AddDebitStub implements AddDebit {
    async add (debit: AddDebitModel): Promise<DebitModel> {
      return new Promise(resolve => resolve(makeFakeDebit()))
    }
  }
  return new AddDebitStub()
}
const makeLoadClientById = (): LoadClientById => {
  class LoadClientByIdStub implements LoadClientById {
    async load (id: string): Promise<ClientModel> {
      return new Promise(resolve => resolve(makeFakeClient()))
    }
  }
  return new LoadClientByIdStub()
}
interface SutTypes {
  sut: AddDebitController
  addDebitStub: AddDebit
  loadClientByIdStub: LoadClientById
}

const makeSut = (): SutTypes => {
  const addDebitStub = makeAddDebit()
  const loadClientByIdStub = makeLoadClientById()
  const sut = new AddDebitController(addDebitStub,loadClientByIdStub)
  return {
    sut,
    addDebitStub,
    loadClientByIdStub
  }
}

describe('AddDebit Controller', () => {
  describe('AddDebit', () => {
    test('Should AddDebit Controller calls AddDebit with correct values', async () => {
      const { sut, addDebitStub } = makeSut()
      const addSpy = jest.spyOn(addDebitStub,'add')
      await sut.handle(makeFakeRequest())

      expect(addSpy).toBeCalledWith(makeFakeRequest().body)
    })

    test('Should return 500 if AddDebit throws', async () => {
      const { sut, addDebitStub } = makeSut()
      jest.spyOn(addDebitStub,'add').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })
  })

  describe('LoadClientById', () => {
    test('Should AddDebit Controller calls LoadClientById with correct id', async () => {
      const { sut, loadClientByIdStub } = makeSut()
      const loadSpy = jest.spyOn(loadClientByIdStub,'load')
      await sut.handle(makeFakeRequest())

      expect(loadSpy).toBeCalledWith('any_clientId')
    })

    test('Should return 500 if LoadClientById throws', async () => {
      const { sut, loadClientByIdStub } = makeSut()
      jest.spyOn(loadClientByIdStub,'load').mockImplementationOnce(() => {
        throw new Error()
      })
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should return 403 if LoadClientById returns null', async () => {
      const { sut, loadClientByIdStub } = makeSut()
      jest.spyOn(loadClientByIdStub,'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(badRequest(new InvalidParamError('clientId')))
    })
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeDebit()))
  })
})
