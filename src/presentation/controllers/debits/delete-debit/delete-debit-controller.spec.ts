import { DeleteDebit, HttpRequest } from './delete-debit-protocols'
import { DeleteDebitController } from './delete-debit-controller'

const makeRequest = (): HttpRequest => ({
  params: { id: 1 }
})

const makeDeleteDebit = (): DeleteDebit => {
  class DeleteDebitStub implements DeleteDebit {
    async delete (id: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteDebitStub()
}

interface SutTypes {
  sut: DeleteDebitController
  deleteDebitStub: DeleteDebit
}

const makeSut = (): SutTypes => {
  const deleteDebitStub = makeDeleteDebit()
  const sut = new DeleteDebitController(deleteDebitStub)
  return {
    sut,
    deleteDebitStub
  }
}

describe('DeleteDebit Controller', () => {
  test('Should call DeleteDebit with correct id', async () => {
    const { sut, deleteDebitStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteDebitStub,'delete')
    await sut.handle(makeRequest())
    expect(deleteSpy).toHaveBeenCalledWith(1)
  })
})
