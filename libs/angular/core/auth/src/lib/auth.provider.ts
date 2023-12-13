import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { authInitializerProvider } from './providers/auth-initial.provider';
import { authRedirectProvider } from './providers/auth-redirect.provider';
import { authInterceptor, authRefreshInterceptor } from './interceptors';
import { AuthEffects } from './store/auth.effects';
import { AuthExtraEffects } from './store/auth-extra.effects';
import { authFeature } from './store/auth.feature';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const authProvider = (options: {
  authGuardRedirectPath: string[];
}): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideState(authFeature),
    provideEffects([AuthEffects, AuthExtraEffects]),

    provideHttpClient(withInterceptors([authRefreshInterceptor, authInterceptor])),

    authInitializerProvider(),
    authRedirectProvider(options.authGuardRedirectPath),
  ]);
};
