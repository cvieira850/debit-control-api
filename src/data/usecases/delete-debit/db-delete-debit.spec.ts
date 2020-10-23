import { DeleteDebitRepository } from './db-delete-debit-protocols'
import { DbDeleteDebit } from './db-delete-debit'

const makeDeleteDebitRepository = (): DeleteDebitRepository => {
  class DeleteDebitRepositoryStub implements DeleteDebitRepository {
    async delete (id: number): Promise<void> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new DeleteDebitRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteDebit
  deleteDebitRepositoryStub: DeleteDebitRepository
}
const makeSut = (): SutTypes => {
  const deleteDebitRepositoryStub = makeDeleteDebitRepository()
  const sut = new DbDeleteDebit(deleteDebitRepositoryStub)
  return {
    sut,
    deleteDebitRepositoryStub
  }
}
describe('DbDeleteDebit usecase', () => {
  test('Should call DeleteDebitRepositoy with correct id', async () => {
    const { sut,deleteDebitRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteDebitRepositoryStub,'delete')
    await sut.delete(1)
    expect(deleteSpy).toHaveBeenCalledWith(1)
  })
})
