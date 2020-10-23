import { DeleteDebit, HttpRequest } from './delete-debit-protocols'
import { DeleteDebitController } from './delete-debit-controller'
import { serverError,noContent } from '../../../helpers/http/http-helpers'

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

  test('Should throw if DeleteDebit throws', async () => {
    const { sut,deleteDebitStub } = makeSut()
    jest.spyOn(deleteDebitStub,'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if valid id is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
