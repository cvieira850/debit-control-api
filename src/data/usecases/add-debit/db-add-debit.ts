import { AddDebit, AddDebitModel, DebitModel, AddDebitRepository,LoadClientByIdRepository } from './db-add-debit-protocols'

export class DbAddDebit implements AddDebit {
  constructor (
    private readonly addDebitRepository: AddDebitRepository,
    private readonly loadClientByIdRepository: LoadClientByIdRepository
  ) {}

  async add (debitData: AddDebitModel): Promise<DebitModel> {
    await this.loadClientByIdRepository.loadById(debitData.clientId)
    await this.addDebitRepository.add(debitData)
    return new Promise(resolve => resolve(null))
  }
}
