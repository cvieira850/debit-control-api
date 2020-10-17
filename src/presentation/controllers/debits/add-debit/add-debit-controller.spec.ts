import { AddDebitController } from './add-debit-controller'
import { AddDebitModel, DebitModel, AddDebit } from './add-debit-protocols'
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

const makeAddDebit = (): AddDebit => {
  class AddDebitStub implements AddDebit {
    async add (debit: AddDebitModel): Promise<DebitModel> {
      return new Promise(resolve => resolve(makeFakeDebit()))
    }
  }
  return new AddDebitStub()
}

interface SutTypes {
  sut: AddDebitController
  addDebitStub: AddDebit
}

const makeSut = (): SutTypes => {
  const addDebitStub = makeAddDebit()
  const sut = new AddDebitController(addDebitStub)
  return {
    sut,
    addDebitStub
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

    test('Should return 400 if AddDebit returns null', async () => {
      const { sut, addDebitStub } = makeSut()
      jest.spyOn(addDebitStub,'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
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
