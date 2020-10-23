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
  describe('GET /debits/id', () => {
    test('Should return 200 on load debit by id ', async () => {
      const res = await request(app)
        .post('/api/debits')
        .send({
          clientId: '1',
          reason: 'any_reason',
          date: '2020-10-10',
          value: '10,00'
        })
      const { id } = res.body
      await request(app)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .get(`/api/debits/${id}`)
        .expect(200)
    })
  })
  describe('GET /debits', () => {
    test('Should return 200 on load debits', async () => {
      await request(app)
        .post('/api/debits')
        .send({
          clientId: '1',
          reason: 'any_reason',
          date: '2020-10-10',
          value: '10,00'
        })
      await request(app)
        .post('/api/debits')
        .send({
          clientId: '1',
          reason: 'any_reason2',
          date: '2020-11-10',
          value: '35,00'
        })
      await request(app)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .get('/api/debits/')
        .expect(200)
    })
  })
  describe('DELETE /debits/id', () => {
    test('Should return 204 on load debits', async () => {
      const res = await request(app)
        .post('/api/debits')
        .send({
          clientId: '1',
          reason: 'any_reason',
          date: '2020-10-10',
          value: '10,00'
        })
      const { id } = res.body
      await request(app)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .delete(`/api/debits/${id}`)
        .expect(204)
    })
  })
})
