import { IConfig } from '@libs/ng/core/config';

export const environment: IConfig = {
  production: true,
  apiUrl: '',
  authUrl: '',

  userInactivityTime: 1000 * 60 * 5,
};
