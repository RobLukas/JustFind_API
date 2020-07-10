import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Companies {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public nameId: string;

  @Column()
  public name: string;

  @Column()
  public logo: string;

  @Column()
  public website: string;

  @Column()
  public size: string;
}

export default Companies;
