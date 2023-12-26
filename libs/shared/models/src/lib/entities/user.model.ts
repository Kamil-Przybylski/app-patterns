import { UserId } from '../common';
import { IBaseEntity } from './base.model';

export interface IUserBaseEntity {
  username: string;
  email: string;
}

export interface IUserEntity extends IBaseEntity<UserId>, IUserBaseEntity {}
