export type LocalStorageKeys = 'accessToken' | 'refreshToken';

export interface ILocalStorage {
  accessToken: string;
  refreshToken: string;
}
