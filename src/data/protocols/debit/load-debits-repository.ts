import { DebitModel } from '../../../domain/models/debit'

export interface LoadDebitsRepository {
  load: () => Promise<DebitModel[]>
}
