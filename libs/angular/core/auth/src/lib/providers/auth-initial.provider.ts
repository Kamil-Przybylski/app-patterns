import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';
import { Store } from '@ngrx/store';
import { authActions } from '../store/auth.actions';

const authInitializerProviderFactory = () => {
  const store = inject(Store);

  return () => {
    const accessToken = LocalStorageUtils.getItem(LocalStorageKeys.ACCESS_TOKEN);
    const refreshToken = LocalStorageUtils.getItem(LocalStorageKeys.REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      store.dispatch(authActions.logIn({ payload: { accessToken, refreshToken } }));
    }
    return true;
  };
};

export const authInitializerProvider = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializerProviderFactory,
      multi: true,
    },
  ]);
};