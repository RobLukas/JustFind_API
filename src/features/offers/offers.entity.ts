import { Column, Entity, Index, ManyToOne } from 'typeorm';
import Companies from 'src/features/companies/companies.entity';
import { MainTechnology } from './types/mainTechnology.types';
import { ExperienceLevel } from './types/experienceLevel.types';
import { Currency } from './types/currency.types';
import { TechnologySkillLevel } from './types/technologySkillLevel.types';
import BaseEntity from 'utils/baseEntity';

@Entity()
class Offers extends BaseEntity {
  @Index({ unique: true })
  @Column()
  slug: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column()
  salaryFrom: number;

  @Column()
  salaryTo: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'simple-json' })
  technologies: TechnologySkillLevel[];

  @Column({
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  @Column({
    type: 'enum',
    enum: ExperienceLevel,
  })
  experienceLevel: ExperienceLevel;

  @Column({
    type: 'enum',
    enum: MainTechnology,
  })
  mainTechnology: MainTechnology;

  @ManyToOne(() => Companies, (company: Companies) => company.offers)
  company: Companies;

  @Column()
  companyId: string;
}

export default Offers;
