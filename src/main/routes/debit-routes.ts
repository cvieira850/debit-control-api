import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddDebitController } from '../factories/controllers/debit/add-debit/add-debit-controller-factory'
export default (router: Router): void => {
  router.post('/debits', adaptRoute(makeAddDebitController()))
}
