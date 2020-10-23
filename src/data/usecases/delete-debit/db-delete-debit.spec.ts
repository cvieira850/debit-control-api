import { DeleteDebitRepository } from './db-delete-debit-protocols'
import { DbDeleteDebit } from './db-delete-debit'

describe('DbDeleteDebit usecase', () => {
  test('Should call DeleteDebitRepositoy with correct id', async () => {
    class DeleteDebitRepositoryStub implements DeleteDebitRepository {
      async delete (id: number): Promise<void> {
        return new Promise(resolve => resolve(null))
      }
    }
    const deleteDebitRepositoryStub = new DeleteDebitRepositoryStub()
    const sut = new DbDeleteDebit(deleteDebitRepositoryStub)
    const deleteSpy = jest.spyOn(deleteDebitRepositoryStub,'delete')
    await sut.delete(1)
    expect(deleteSpy).toHaveBeenCalledWith(1)
  })
})
