import { AddDebitRepository } from '../../../../data/protocols/debit/add-debit-repository'
import { AddDebitModel } from '../../../../domain/usecases/add-debit'
import { DebitModel } from '../../../../domain/models/debit'
import Debit from '../typeorm/entities/debit'
import { getRepository } from 'typeorm'

export class DebitRepository implements AddDebitRepository {
  async add (debitData: AddDebitModel): Promise<DebitModel> {
    const DebitRepository = getRepository(Debit)
    const debitCreated = DebitRepository.create(debitData)
    const debit = await DebitRepository.save(debitCreated)
    const { id, ...debitValues } = debit
    return Object.assign({}, debitValues, { id: id.toString() })
  }
}
