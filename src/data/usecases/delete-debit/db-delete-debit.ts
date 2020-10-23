import { DeleteDebitRepository } from './db-delete-debit-protocols'

export class DbDeleteDebit implements DeleteDebitRepository {
  constructor (private readonly deleteDebitRepository: DeleteDebitRepository) {}
  async delete (id: number): Promise<void> {
    await this.deleteDebitRepository.delete(id)
    return null
  }
}
