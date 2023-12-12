import { IBase } from '../base/base.model';

export interface IUser extends IBase {
  username: string;
  email: string;
  hashedPassword: string;
  isActive: boolean;
  hashedRefreshToken: string | null;
}

export interface ISignUpUser {
  username: string;
  email: string;
  password: string;
}

export interface ISignInUser {
  email: string;
  password: string;
}
