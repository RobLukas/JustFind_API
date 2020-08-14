import slugify from 'utils/slugify';
import { Column, Entity, BeforeInsert, OneToMany, Index } from 'typeorm';
import Offices from 'offices/offices.entity';
import BaseEntity from 'utils/baseEntity';

@Entity()
class Companies extends BaseEntity {
  @Index({ unique: true })
  @Column()
  slug: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  logo: string;

  @Column({ type: 'varchar', length: 150 })
  website: string;

  @Column({ type: 'int' })
  size: number;

  @OneToMany(() => Offices, (office: Offices) => office.company)
  offices: Offices[];

  @BeforeInsert()
  private generateSlugName(): void {
    this.slug = slugify(String(this.name));
  }
}

export default Companies;
