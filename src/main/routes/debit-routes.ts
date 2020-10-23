import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddDebitController } from '../factories/controllers/debit/add-debit/add-debit-controller-factory'
import { makeLoadDebitsController } from '../factories/controllers/debit/load-debits/load-debits-controller-factory'
import { makeLoadDebitByIdController } from '../factories/controllers/debit/load-debit-by-id/load-debit--by-id-controller-factory'
import { makeDeleteDebitController } from '../factories/controllers/debit/delete-debit/delete-debit-controller-factory'
export default (router: Router): void => {
  router.post('/debits', adaptRoute(makeAddDebitController()))
  router.get('/debits/:id', adaptRoute(makeLoadDebitByIdController()))
  router.get('/debits/', adaptRoute(makeLoadDebitsController()))
  router.delete('/debits/:id', adaptRoute(makeDeleteDebitController()))
}
