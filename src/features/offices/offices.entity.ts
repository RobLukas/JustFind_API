import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from 'utils/baseEntity';
import Companies from 'companies/companies.entity';
import { CityCategory } from './types/cityCategory.types';
import { Geometry } from './types/geometry.types';

@Entity()
class Offices extends BaseEntity {
  @Column({ type: 'enum', enum: CityCategory })
  city: CityCategory;

  @Column({ type: 'varchar', length: 50 })
  street: string;

  @Column()
  postalCode: string;

  @Column({ type: 'varchar', length: 60, default: 'poland' })
  country: string;

  @Column({ type: 'simple-json', nullable: true })
  geoPosition: Geometry;

  @ManyToOne(() => Companies, (company: Companies) => company.offices)
  company: Companies;

  @Column()
  companyId: string;
}

export default Offices;
