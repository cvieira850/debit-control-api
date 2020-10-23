import { DebitModel } from '../models/debit'

export interface LoadDebits {
  load: () => Promise<DebitModel[]>
}
