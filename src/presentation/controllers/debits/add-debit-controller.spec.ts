import { AddDebitController } from './add-debit-controller'
import { AddDebitModel, DebitModel, AddDebit } from './add-debit-protocols'
import { HttpRequest } from '../../protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    userId: 'any_id',
    reason: 'any_reason',
    date: 'any_date',
    value: 'any_value'
  }
})

const makeFakeDebit = (): DebitModel => ({
  id: 'any_id',
  userId: 'any_userid',
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
  test('Should AddDebit Controller calls AddDebit with correct values', async () => {
    const { sut, addDebitStub } = makeSut()
    const addSpy = jest.spyOn(addDebitStub,'add')
    await sut.handle(makeFakeRequest())

    expect(addSpy).toBeCalledWith(makeFakeRequest().body)
  })
})
