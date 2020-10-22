import { LoadDebitByIdController } from '../../../../../presentation/controllers/debits/load-debit-by-id/load-debit-by-id-controller'
import { Controller } from '../../../../../presentation/protocols'
import { MakeDbLoadDebitById } from '../../../usecases/debit/load-debit-by-id/db-load-debit-by-id-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadDebitByIdController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadDebitByIdController(
      MakeDbLoadDebitById()
    )
  )
}
