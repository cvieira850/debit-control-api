import { DeleteDebitController } from '../../../../../presentation/controllers/debits/delete-debit/delete-debit-controller'
import { Controller } from '../../../../../presentation/protocols'
import { MakeDbDeleteDebit } from '../../../usecases/debit/delete-debit/db-delete-debit-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeDeleteDebitController = (): Controller => {
  return makeLogControllerDecorator(
    new DeleteDebitController(
      MakeDbDeleteDebit()
    )
  )
}
