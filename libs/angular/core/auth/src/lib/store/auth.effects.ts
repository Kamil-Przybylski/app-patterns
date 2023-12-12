import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';
import { AuthService } from '../services/auth.service';
import { authFeature } from './auth.feature';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  #store = inject(Store);
  #actions = inject(Actions);
  #authService = inject(AuthService);

  logIn$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(authActions.logIn),
        tap(({ payload }) => {
          LocalStorageUtils.setItem(LocalStorageKeys.ACCESS_TOKEN, payload.accessToken);
          LocalStorageUtils.setItem(LocalStorageKeys.REFRESH_TOKEN, payload.refreshToken);
        }),
      ),
    {
      dispatch: false,
    },
  );

  logOut$ = createEffect(() =>
    this.#actions.pipe(
      ofType(authActions.logOut),
      concatLatestFrom(() => this.#store.select(authFeature.selectUserId)),
      exhaustMap(([, userId]) =>
        this.#authService.logout(userId).pipe(
          map(() => authActions.logOutExecute()),
          catchError(() => of(authActions.logOutExecute())),
        ),
      ),
    ),
  );

  logOutSuccess$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(authActions.logOutExecute),
        tap(() => {
          LocalStorageUtils.removeItem(LocalStorageKeys.ACCESS_TOKEN);
          LocalStorageUtils.removeItem(LocalStorageKeys.REFRESH_TOKEN);
          location.reload();
        }),
      ),
    {
      dispatch: false,
    },
  );

  refreshToken$ = createEffect(() =>
    this.#actions.pipe(
      ofType(authActions.refreshToken),
      exhaustMap(() => {
        const refreshToken = LocalStorageUtils.getItem(LocalStorageKeys.REFRESH_TOKEN);
        if (!refreshToken) return of(authActions.logOut());

        return this.#authService.getRefreshToken({ refreshToken }).pipe(
          tap((res) => {
            LocalStorageUtils.setItem(LocalStorageKeys.ACCESS_TOKEN, res.accessToken);
          }),
          map((res) => authActions.refreshTokenSuccess({ payload: res })),
          catchError(() => of(authActions.logOut())),
        );
      }),
    ),
  );
}