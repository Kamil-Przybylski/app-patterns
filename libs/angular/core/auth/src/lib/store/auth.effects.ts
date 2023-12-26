import { Injectable, inject } from '@angular/core';
import { LocalStorage } from '@libs/ng/shared/local-storage';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { authFeature } from './auth.feature';

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
          LocalStorage.setItem('accessToken', payload.accessToken);
          LocalStorage.setItem('refreshToken', payload.refreshToken);
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
          LocalStorage.removeItem('accessToken');
          LocalStorage.removeItem('refreshToken');
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
        const refreshToken = LocalStorage.getItem('refreshToken');
        if (!refreshToken) return of(authActions.logOut());

        return this.#authService.getRefreshToken({ refreshToken }).pipe(
          tap((res) => {
            LocalStorage.setItem('accessToken', res.accessToken);
          }),
          map((res) => authActions.refreshTokenSuccess({ payload: res })),
          catchError(() => of(authActions.logOut())),
        );
      }),
    ),
  );
}
