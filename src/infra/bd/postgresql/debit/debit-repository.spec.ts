import { getConnection, Connection } from 'typeorm'
import { tables } from '../tables'
import createConnection from '../typeorm/index'
import { DebitRepository } from './debit-repository'

let connection: Connection
describe('DebitRepository', () => {
  beforeAll(async () => {
    connection = await createConnection()
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table}`)
    }
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
  })

  afterAll(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })
  describe('add()', () => {
    test('Should return an debit on add success', async () => {
      const sut = new DebitRepository()
      const debit = await sut.add({
        clientId: 'any_id',
        reason: 'any_reason',
        date: 'any_date',
        value: 'any_value'
      })
      expect(debit).toBeTruthy()
      expect(debit.id).toBeTruthy()
      expect(debit.clientId).toBe('any_id')
      expect(debit.reason).toBe('any_reason')
      expect(debit.date).toBe('any_date')
      expect(debit.value).toBe('any_value')
    })
  })
  describe('loadById()', () => {
    test('Should load a debit by id on success', async () => {
      const sut = new DebitRepository()
      const res = await sut.add({
        clientId: 'any_id',
        reason: 'any_reason',
        date: 'any_date',
        value: 'any_value'
      })
      const debit = await sut.loadById(res.id.toString())
      expect(debit).toBeTruthy()
      expect(debit.id).toBe(res.id.toString())
      expect(debit.clientId).toBe('any_id')
      expect(debit.reason).toBe('any_reason')
      expect(debit.date).toBe('any_date')
      expect(debit.value).toBe('any_value')
    })
  })
})
