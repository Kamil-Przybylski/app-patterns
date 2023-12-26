import { UserId } from '@libs/shared/models';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { IUserDb } from './user.models';

@Entity()
export class UserEntity extends BaseEntity<UserId> implements IUserDb {
  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({ type: 'varchar' })
  public hashedPassword: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  public username: string;

  @Column({ default: true })
  public isActive: boolean;

  @Column({ nullable: true })
  public hashedRefreshToken: string | null;
}
