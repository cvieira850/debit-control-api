import app from '../config/app'
import { Connection, getConnection } from 'typeorm'
import request from 'supertest'
import createConnection from '../../infra/bd/postgresql/typeorm/index'
import { tables } from '../../infra/bd/postgresql/tables'

let connection: Connection
describe('Debit Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table}`)
    }
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })
  afterAll(async () => {
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })

  beforeEach(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
  })
  describe('Post /debits', () => {
    test('Should return 200 on add a new debit', async () => {
      await request(app)
        .post('/api/debits')
        .send({
          clientId: '1',
          reason: 'any_reason',
          date: '2020-10-10',
          value: '10,00'
        })
        .expect(200)
    })
  })
})
