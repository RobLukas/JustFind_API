import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Companies from 'src/companies/companies.entity';
import {
  MainTechnologiesTypes,
  MainTechnologiesCollection,
} from './types/mainTechnologies.types';
import {
  ExperienceLevelTypes,
  ExperienceLevelCollection,
} from './types/experienceLevel.types';
import { CurrencyTypes, CurrencyCollection } from './types/currency.types';

@Entity()
class Offers {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public nameId: string;

  @Column()
  public Title: string;

  @OneToOne(type => Companies)
  @JoinColumn()
  public company: Companies;

  @Column({
    type: 'enum',
    enum: MainTechnologiesCollection,
  })
  public mainTechnology: MainTechnologiesTypes;

  @Column()
  public technologies: string[];

  @Column()
  public geoPosition: string;

  @Column()
  public cityCategory: string;

  @Column({
    type: 'enum',
    enum: ExperienceLevelCollection,
  })
  public experienceLevel: ExperienceLevelTypes;

  @Column()
  public salaryFrom: number;

  @Column()
  public salaryTo: number;

  @Column({
    type: 'enum',
    enum: CurrencyCollection,
  })
  public currency: CurrencyTypes;

  @Column()
  public description: string;
}

export default Offers;
