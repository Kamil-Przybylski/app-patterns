import { UserId } from '@libs/shared/models';

export interface ITokenPayloadDto {
  sub: UserId;
  exp?: number;
  iat?: number;
}
