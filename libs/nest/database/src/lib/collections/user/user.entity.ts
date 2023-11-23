import { Entity, Column } from 'typeorm';
import { IUser } from './user.models';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class UserEntity extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({ type: 'varchar' })
  public hashedPassword: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  public username: string;

  @Column({ default: true })
  public isActive: boolean;
}
