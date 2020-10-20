import { AddDebitRepository } from '../../../../data/protocols/debit/add-debit-repository'
import { LoadDebitByIdRepository } from '../../../../data/protocols/debit/load-debit-by-id-repository'
import { AddDebitModel } from '../../../../domain/usecases/add-debit'
import { DebitModel } from '../../../../domain/models/debit'
import Debit from '../typeorm/entities/debit'
import { getRepository } from 'typeorm'

export class DebitRepository implements AddDebitRepository, LoadDebitByIdRepository {
  async add (debitData: AddDebitModel): Promise<DebitModel> {
    const DebitRepository = getRepository(Debit)
    const debitCreated = DebitRepository.create(debitData)
    const debit = await DebitRepository.save(debitCreated)
    const { id, ...debitValues } = debit
    return Object.assign({}, debitValues, { id: id.toString() })
  }

  async loadById (idData: string): Promise<DebitModel> {
    const DebitRepository = getRepository(Debit)
    const debitLoaded = await DebitRepository.findOne(idData)
    const { id, ...debitLoadedValues } = debitLoaded
    return Object.assign({}, debitLoadedValues, { id: id.toString() })
  }
}
