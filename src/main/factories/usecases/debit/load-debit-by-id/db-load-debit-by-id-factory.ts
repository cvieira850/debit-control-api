import { DebitRepository } from '../../../../../infra/bd/postgresql/debit/debit-repository'
import { DbLoadDebitById } from '../../../../../data/usecases/load-debit-by-id/db-load-debit-by-id'
import { LoadDebitById } from '../../../../../domain/usecases/load-debit-by-id'

export const MakeDbLoadDebitById = (): LoadDebitById => {
  const debitPgRepository = new DebitRepository()
  return new DbLoadDebitById(debitPgRepository)
}
