import { DebitRepository } from '../../../../../infra/bd/postgresql/debit/debit-repository'
import { AddDebit } from '../../../../../domain/usecases/add-debit'
import { DbAddDebit } from '../../../../../data/usecases/add-debit/db-add-debit'
import { ClientRepository } from '../../../../../infra/axios/jsonplaceholder/client/client-repository'

export const MakeDbAddDebit = (): AddDebit => {
  const debitPgRepository = new DebitRepository()
  const clientRepository = new ClientRepository()
  return new DbAddDebit(debitPgRepository,clientRepository)
}
