import { LoadDebitsController } from '../../../../../presentation/controllers/debits/load-debits/load-debits-controller'
import { Controller } from '../../../../../presentation/protocols'
import { MakeDbLoadDebits } from '../../../usecases/debit/load-debits/db-load-debits-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadDebitsController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadDebitsController(
      MakeDbLoadDebits()
    )
  )
}
