import { APP_INITIALIZER, inject } from '@angular/core';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';
import { Store } from '@ngrx/store';
import { authActions } from './store/auth.actions';

const authInitialProviderFactory = () => {
  const store = inject(Store);

  return () => {
    const accessToken = LocalStorageUtils.getItem(LocalStorageKeys.ACCESS_TOKEN);
    const refreshToken = LocalStorageUtils.getItem(LocalStorageKeys.ACCESS_TOKEN);

    if (accessToken && refreshToken) {
      store.dispatch(authActions.initLogIn({ payload: { accessToken, refreshToken } }));
    } else {
      store.dispatch(authActions.logOut());
    }
    return true;
  };
};

export const getAuthInitialProvider = () => ({
  provide: APP_INITIALIZER,
  useFactory: authInitialProviderFactory,
  multi: true,
});
