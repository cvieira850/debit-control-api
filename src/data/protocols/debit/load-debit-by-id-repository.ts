import { DebitModel } from '../../../domain/models/debit'

export interface LoadDebitByIdRepository {
  loadById: (id: string) => Promise<DebitModel>
}
