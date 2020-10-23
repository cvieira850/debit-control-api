import { DebitRepository } from '../../../../../infra/bd/postgresql/debit/debit-repository'
import { DbLoadDebits } from '../../../../../data/usecases/load-debits/db-load-debits'
import { LoadDebits } from '../../../../../domain/usecases/load-debits'

export const MakeDbLoadDebits = (): LoadDebits => {
  const debitPgRepository = new DebitRepository()
  return new DbLoadDebits(debitPgRepository)
}
