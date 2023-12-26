import { IBaseEntity } from '@libs/shared/models';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity<ID> implements IBaseEntity<ID> {
  @PrimaryGeneratedColumn()
  public id: ID;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;
}
