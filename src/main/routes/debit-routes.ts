import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddDebitController } from '../factories/controllers/debit/add-debit/add-debit-controller-factory'
import { makeLoadDebitByIdController } from '../factories/controllers/debit/load-debit-by-id/load-debit--by-id-controller-factory'
export default (router: Router): void => {
  router.post('/debits', adaptRoute(makeAddDebitController()))
  router.get('/debits/:id', adaptRoute(makeLoadDebitByIdController()))
}
