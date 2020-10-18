import { LoadClientByIdRepository } from '../../../../data/usecases/add-debit/db-add-debit-protocols'
import { ClientModel } from '../../../../domain/models/client'
import axios from 'axios'

export class ClientRepository implements LoadClientByIdRepository {
  async loadById (id: string): Promise<ClientModel> {
    const client = await axios.get('https://jsonplaceholder.typicode.com/users/' + id)
    return client.data
  }
}
