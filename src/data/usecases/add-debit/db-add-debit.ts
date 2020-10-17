import { AddDebit, AddDebitModel, DebitModel, AddDebitRepository,LoadClientByIdRepository } from './db-add-debit-protocols'

export class DbAddDebit implements AddDebit {
  constructor (
    private readonly addDebitRepository: AddDebitRepository,
    private readonly loadClientByIdRepository: LoadClientByIdRepository
  ) {}

  async add (debitData: AddDebitModel): Promise<DebitModel> {
    const client = await this.loadClientByIdRepository.loadById(debitData.clientId)
    if (client) {
      const debit = await this.addDebitRepository.add(debitData)
      return debit
    }
    return new Promise(resolve => resolve(null))
  }
}
