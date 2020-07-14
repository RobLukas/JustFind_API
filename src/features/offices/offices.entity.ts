import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import Companies from '../companies/companies.entity';

@Entity()
class Offices {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(type => Companies)
  @JoinColumn()
  company: Companies;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  street: string;

  @CreateDateColumn()
  createAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

export default Offices;
