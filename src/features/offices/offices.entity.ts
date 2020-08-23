import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from 'utils/baseEntity';
import Companies from 'companies/companies.entity';

@Entity()
class Offices extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  street: string;

  @Column()
  postalCode: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column()
  geoPosition: string;

  @ManyToOne(() => Companies, (company: Companies) => company.offices)
  company: Companies;

  @Column()
  companyId: string;
}

export default Offices;
