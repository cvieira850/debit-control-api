import { DebitModel } from '../models/debit'

export interface LoadDebitById {
  load: (id: string) => Promise<DebitModel>
}
