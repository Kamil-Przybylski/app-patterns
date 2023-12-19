import { UserId } from '@libs/shared/models';

export interface IUserDto {
  id: UserId;
  username: string;
  email: string;
}

export interface IAccessTokenDto {
  sub: number;
  exp?: number;
  iat?: number;
}

export interface ISignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface IRefreshTokenRequestDto {
  refreshToken: string;
}

export interface IRefreshTokenResponseDto {
  accessToken: string;
}

export interface ISignInResponseDto {
  user: IUserDto;
  accessToken: string;
  refreshToken: string;
}
