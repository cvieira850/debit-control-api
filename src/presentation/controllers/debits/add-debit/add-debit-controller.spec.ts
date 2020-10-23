import { AddDebitController } from './add-debit-controller'
import { AddDebitModel, DebitModel, AddDebit, Validation } from './add-debit-protocols'
import { HttpRequest } from '../../../protocols'
import { serverError, ok, badRequest } from '../../../helpers/http/http-helpers'
import { ServerError, InvalidParamError, MissingParamError } from '../../../errors'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    clientId: 'any_clientId',
    reason: 'any_reason',
    date: 'any_date',
    value: 'any_value'
  }
})

const makeFakeDebit = (): DebitModel => ({
  id: 1,
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: AddDebitController
  addDebitStub: AddDebit
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addDebitStub = makeAddDebit()
  const validationStub = makeValidation()
  const sut = new AddDebitController(validationStub,addDebitStub)
  return {
    sut,
    addDebitStub,
    validationStub
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
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 400 if validation returns an error ', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub,'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeDebit()))
  })
})
