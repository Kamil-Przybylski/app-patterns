import { APP_INITIALIZER, inject } from '@angular/core';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';
import { Store } from '@ngrx/store';
import { authActions } from './store/auth.actions';

const authInitialProviderFactory = () => {
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

export const getAuthInitialProvider = () => ({
  provide: APP_INITIALIZER,
  useFactory: authInitialProviderFactory,
  multi: true,
});
