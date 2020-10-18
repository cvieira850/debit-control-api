import { ClientRepository } from './client-repository'
describe('ClientRepository', () => {
  test('Should load client by id', async () => {
    const sut = new ClientRepository()
    const client = await sut.loadById('1')
    expect(client).toBeTruthy()
  })
})
