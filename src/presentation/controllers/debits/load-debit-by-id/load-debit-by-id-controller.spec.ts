import { LoadDebitByIdController } from './load-debit-by-id-controller'
import { DebitModel, LoadDebitById } from './load-debit-by-id-protocols'

describe('LoadDebitById Controller', () => {
  test('Should call LoadDebitById with corrrect id', async () => {
    class LoadDebitByIdStub implements LoadDebitById {
      async load (id: string): Promise<DebitModel> {
        return new Promise(resolve => resolve({
          id: 'any_debit_id',
          clientId: 'any_clientId',
          reason: 'any_reason',
          date: 'any_date',
          value: 'any_value'
        }))
      }
    }
    const loadDebitByIdStub = new LoadDebitByIdStub()
    const sut = new LoadDebitByIdController(loadDebitByIdStub)
    const loadByIdSpy = jest.spyOn(loadDebitByIdStub,'load')
    await sut.handle({
      params: {
        debitId: 'any_debit_id'
      }
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_debit_id')
  })
})
