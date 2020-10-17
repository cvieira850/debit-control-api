import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'

@Entity('debits')
class Debit {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  clientId: string

  @Column()
  reason: string

  @Column()
  date: string

  @Column()
  value: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}

export default Debit
