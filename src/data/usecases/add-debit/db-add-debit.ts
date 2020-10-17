import { AddDebit, AddDebitModel, DebitModel, AddDebitRepository } from './db-add-debit-protocols'

export class DbAddDebit implements AddDebit {
  constructor (private readonly addDebitRepository: AddDebitRepository) {}
  async add (debitData: AddDebitModel): Promise<DebitModel> {
    await this.addDebitRepository.add(debitData)
    return new Promise(resolve => resolve(null))
  }
}
