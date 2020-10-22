import { LoadDebitsRepository } from '../../protocols/debit/load-debits-repository'
import { DebitModel } from './db-load-debits-protocols'

export class DbLoadDebits implements LoadDebitsRepository {
  constructor (private readonly loadDebitsRepository: LoadDebitsRepository) {}
  async load (): Promise<DebitModel[]> {
    await this.loadDebitsRepository.load()
    return new Promise(resolve => resolve(null))
  }
}
