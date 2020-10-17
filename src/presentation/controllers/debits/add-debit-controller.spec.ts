import { AddDebitController } from './add-debit-controller'
import { AddDebitModel, DebitModel, AddDebit } from './add-debit-protocols'

describe('AddDebit Controller', () => {
  test('Should AddDebit Controller calls AddDebit with correct values', async () => {
    class AddDebitStub implements AddDebit {
      async add (debit: AddDebitModel): Promise<DebitModel> {
        return new Promise(resolve => resolve({
          id: 'any_id',
          userId: 'any_userid',
          reason: 'any_reason',
          date: 'any_date',
          value: 'any_value'
        }))
      }
    }
    const addDebitStub = new AddDebitStub()
    const sut = new AddDebitController(addDebitStub)
    const addSpy = jest.spyOn(addDebitStub,'add')
    await sut.handle({
      body: {
        userId: 'any_id',
        reason: 'any_reason',
        date: 'any_date',
        value: 'any_value'
      }
    })

    expect(addSpy).toBeCalledWith({
      userId: 'any_id',
      reason: 'any_reason',
      date: 'any_date',
      value: 'any_value'
    })
  })
})
