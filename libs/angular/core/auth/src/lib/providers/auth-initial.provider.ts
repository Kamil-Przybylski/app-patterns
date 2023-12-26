import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { LocalStorage } from '@libs/ng/shared/local-storage';
import { Store } from '@ngrx/store';
import { authActions } from '../store/auth.actions';

const authInitializerProviderFactory = () => {
  const store = inject(Store);

  return () => {
    const accessToken = LocalStorage.getItem('accessToken');
    const refreshToken = LocalStorage.getItem('refreshToken');

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
