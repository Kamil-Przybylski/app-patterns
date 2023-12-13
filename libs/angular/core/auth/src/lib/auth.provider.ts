import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AUTH_REDIRECT_PATH_TOKEN } from './auth.token';

export const authProvider = (options: {
  authGuardRedirectPath: string[];
}): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: AUTH_REDIRECT_PATH_TOKEN,
      useValue: options.authGuardRedirectPath,
    },
  ]);
};
