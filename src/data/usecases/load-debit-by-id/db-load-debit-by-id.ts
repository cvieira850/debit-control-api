import { LoadDebitByIdRepository } from 'data/protocols/debit/load-debit-by-id-repository'
import { DebitModel } from './db-load-debit-by-id-protocols'

export class DbLoadDebitById implements LoadDebitByIdRepository {
  constructor (private readonly loadDebitByIdRepository: LoadDebitByIdRepository) {}
  async loadById (id: string): Promise<DebitModel> {
    const debit = await this.loadDebitByIdRepository.loadById(id)
    return debit
  }
}
