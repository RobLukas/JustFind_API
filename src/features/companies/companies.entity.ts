import slugify from 'utils/slugify';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  logo: string;

  @Column({ type: 'varchar', length: 150 })
  website: string;

  @Column({ type: 'int' })
  size: number;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  private updateDate(): void {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  private generateSlugName(): void {
    this.slug = slugify(String(this.name));
  }
}

export default Companies;
