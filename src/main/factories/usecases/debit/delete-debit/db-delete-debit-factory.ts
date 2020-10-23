import { DebitRepository } from '../../../../../infra/bd/postgresql/debit/debit-repository'
import { DbDeleteDebit } from '../../../../../data/usecases/delete-debit/db-delete-debit'
import { DeleteDebit } from '../../../../../domain/usecases/delete-debit'

export const MakeDbDeleteDebit = (): DeleteDebit => {
  const debitPgRepository = new DebitRepository()
  return new DbDeleteDebit(debitPgRepository)
}
