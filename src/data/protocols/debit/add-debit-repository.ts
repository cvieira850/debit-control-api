import { AddDebitModel } from '../../../domain/usecases/add-debit'
import { DebitModel } from '../../../domain/models/debit'

export interface AddDebitRepository {
  add: (debitData: AddDebitModel) => Promise<DebitModel>
}
