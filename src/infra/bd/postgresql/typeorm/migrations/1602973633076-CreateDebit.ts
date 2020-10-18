import { MigrationInterface, QueryRunner,Table } from 'typeorm'

export class CreateDebit1602973633076 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'debits',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'clientId',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'reason',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'date',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'value',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true

          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('debits')
  }
}
