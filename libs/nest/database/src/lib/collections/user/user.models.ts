import { IUserEntity } from '@libs/shared/models';

export interface IUserDb extends IUserEntity {
  hashedPassword: string;
  isActive: boolean;
  hashedRefreshToken: string | null;
}
