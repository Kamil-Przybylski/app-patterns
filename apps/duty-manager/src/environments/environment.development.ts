import { IConfig } from '@libs/ng/core/config';

export const environment: IConfig = {
  production: false,
  authUrl: 'http://localhost:3901/admin',
  apiUrl: 'http://localhost:3900/api',

  userInactivityTime: 1000 * 60 * 5,
};
