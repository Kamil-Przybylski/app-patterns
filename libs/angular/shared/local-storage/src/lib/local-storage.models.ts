import { JwtToken } from '@libs/shared/models';

export interface ILocalStorage {
  accessToken: JwtToken;
  refreshToken: JwtToken;
}
