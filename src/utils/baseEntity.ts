import {
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from 'typeorm';

class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @BeforeUpdate()
  updateDate(): void {
    this.updatedAt = new Date();
  }
}

export default BaseEntity;
