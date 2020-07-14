import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import Companies from 'src/features/companies/companies.entity';
import {
  MainTechnologiesTypes,
  MainTechnologiesCollection,
} from './types/mainTechnology.types';
import {
  ExperienceLevelTypes,
  ExperienceLevelCollection,
} from './types/experienceLevel.types';
import { CurrencyTypes, CurrencyCollection } from './types/currency.types';
import { TechnologySkillLevel } from './interfaces/technologySkillLevel.interface';

@Entity()
class Offers {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  nameId: string;

  @OneToOne(type => Companies)
  @JoinColumn()
  company: Companies;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({
    type: 'enum',
    enum: MainTechnologiesCollection,
  })
  mainTechnology: MainTechnologiesTypes;

  @Column({type: 'jsonb'})
  technologies: TechnologySkillLevel[];

  @Column()
  geoPosition: string;

  @Column()
  cityCategory: string;

  @Column({
    type: 'enum',
    enum: ExperienceLevelCollection,
  })
  experienceLevel: ExperienceLevelTypes;

  @Column()
  salaryFrom: number;

  @Column()
  salaryTo: number;

  @Column({
    type: 'enum',
    enum: CurrencyCollection,
  })
  currency: CurrencyTypes;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}

export default Offers;
