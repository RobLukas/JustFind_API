import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity()
class Companies {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ unique: true })
  public nameId: string;

  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ type: 'varchar', length: 150 })
  public logo: string;

  @Column({ type: 'varchar', length: 150 })
  public website: string;

  @Column({ type: 'int' })
  public size: number;

  @CreateDateColumn()
  createAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

export default Companies;
