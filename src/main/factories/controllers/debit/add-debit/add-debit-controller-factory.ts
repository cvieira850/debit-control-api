import { AddDebitController } from '../../../../../presentation/controllers/debits/add-debit/add-debit-controller'
import { Controller } from '../../../../../presentation/protocols'
import { MakeDbAddDebit } from '../../../usecases/debit/add-debit/db-add-debit-factory'
import { makeAddDebitValidation } from './add-debit-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeAddDebitController = (): Controller => {
  return makeLogControllerDecorator(
    new AddDebitController(
      makeAddDebitValidation(),
      MakeDbAddDebit()
    )
  )
}
