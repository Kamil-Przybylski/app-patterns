import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authTokenInterceptor } from './interceptors';
import { authInitializerProvider } from './providers/auth-initial.provider';
import { authRedirectProvider } from './providers/auth-redirect.provider';
import { AuthExtraEffects } from './store/auth-extra.effects';
import { AuthEffects } from './store/auth.effects';
import { authFeature } from './store/auth.feature';

export const authProvider = (options: {
  authGuardRedirectPath: string[];
}): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideState(authFeature),
    provideEffects([AuthEffects, AuthExtraEffects]),

    provideHttpClient(withInterceptors([authTokenInterceptor])),

    authInitializerProvider(),
    authRedirectProvider(options.authGuardRedirectPath),
  ]);
};
