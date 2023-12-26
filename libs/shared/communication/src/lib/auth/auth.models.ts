import { IUserBaseEntity, IUserEntity, JwtToken } from '@libs/shared/models';

export interface IUserResDto extends IUserEntity {}

export interface ISignUpReqDto extends IUserBaseEntity {
  password: string;
}

export interface ISignInReqDto extends Omit<IUserBaseEntity, 'username'> {
  password: string;
}

export interface ISignInResDto {
  user: IUserResDto;
  accessToken: JwtToken;
  refreshToken: JwtToken;
}

export interface IRefreshTokenReqDto {
  refreshToken: JwtToken;
}

export interface IRefreshTokenResDto {
  accessToken: JwtToken;
}
