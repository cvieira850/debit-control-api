import { AddDebitRepository } from '../../../../data/protocols/debit/add-debit-repository'
import { LoadDebitByIdRepository } from '../../../../data/protocols/debit/load-debit-by-id-repository'
import { LoadDebitsRepository } from '../../../../data/protocols/debit/load-debits-repository'
import { DeleteDebitRepository } from '../../../../data/protocols/debit/delete-debit-repository'
import { AddDebitModel } from '../../../../domain/usecases/add-debit'
import { DebitModel } from '../../../../domain/models/debit'
import Debit from '../typeorm/entities/debit'
import { getRepository } from 'typeorm'

export class DebitRepository implements AddDebitRepository, LoadDebitByIdRepository, LoadDebitsRepository, DeleteDebitRepository {
  async add (debitData: AddDebitModel): Promise<DebitModel> {
    const DebitRepository = getRepository(Debit)
    const debitCreated = DebitRepository.create(debitData)
    const debit = await DebitRepository.save(debitCreated)
    return debit
  }

  async loadById (idData: string): Promise<DebitModel> {
    const DebitRepository = getRepository(Debit)
    const debitLoaded = await DebitRepository.findOne(idData)
    if (debitLoaded) {
      return debitLoaded
    }
    return null
  }

  async load (): Promise<DebitModel[]> {
    const DebitRepository = getRepository(Debit)
    const debits = await DebitRepository.find()
    return debits
  }

  async delete (id: number): Promise<null> {
    const DebitRepository = getRepository(Debit)
    const debit = await DebitRepository.findOne(id)
    await DebitRepository.remove(debit)
    return null
  }
}
