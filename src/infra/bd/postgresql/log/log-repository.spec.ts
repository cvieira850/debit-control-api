import { Connection, getConnection , getRepository } from 'typeorm'
import createConnection from '../typeorm/index'
import { LogPgRepository } from './log-repository'
import { tables } from '../tables'
import Error from '../typeorm/entities/error'

let connection: Connection
const makeSut = (): LogPgRepository => {
  return new LogPgRepository()
}

describe('Log Pg Repository', () => {
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
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })
  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const ErrorRepository = getRepository(Error)
    const count = await ErrorRepository.count()
    expect(count).toBe(1)
  })
})
