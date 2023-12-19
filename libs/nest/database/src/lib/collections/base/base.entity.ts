import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IBase } from './base.model';
import { UserId } from '@libs/shared/models';

export class BaseEntity implements IBase {
  @PrimaryGeneratedColumn()
  public id: UserId;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;
}
