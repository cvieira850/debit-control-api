import { DebitModel } from '../models/debit'
export interface AddDebitModel {
  userId: string
  reason: string
  date: string
  value: string
}

export interface AddDebit {
  add: (debit: AddDebitModel) => Promise<DebitModel>
}
