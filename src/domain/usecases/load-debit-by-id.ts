import { DebitModel } from '../models/debit'

export interface LoadDebitById {
  loadById: (id: string) => Promise<DebitModel>
}
