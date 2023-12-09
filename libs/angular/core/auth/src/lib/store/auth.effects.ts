import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { tap } from 'rxjs';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';

@Injectable()
export class AuthEffects {
  #actions = inject(Actions);

  logIn$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(authActions.logIn),
        tap(
          ({ payload }) => (
            LocalStorageUtils.setItem(LocalStorageKeys.ACCESS_TOKEN, payload.accessToken),
            LocalStorageUtils.setItem(LocalStorageKeys.REFRESH_TOKEN, payload.refreshToken)
          ),
        ),
      ),
    {
      dispatch: false,
    },
  );
}
