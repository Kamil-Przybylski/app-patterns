import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBase } from './base.model';

export class BaseEntity implements IBase {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;
}
