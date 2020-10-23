import { DeleteDebit } from './delete-debit-protocols'
import { DeleteDebitController } from './delete-debit-controller'
describe('DeleteDebit Controller', () => {
  test('Should call DeleteDebit with correct id', async () => {
    class DeleteDebitStub implements DeleteDebit {
      async delete (id: string): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const deleteDebitStub = new DeleteDebitStub()
    const sut = new DeleteDebitController(deleteDebitStub)
    const deleteSpy = jest.spyOn(deleteDebitStub,'delete')
    await sut.handle({ params: { id: 1 } })
    expect(deleteSpy).toHaveBeenCalledWith(1)
  })
})
