import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
  exhaustMap,
  filter,
  fromEvent,
  interval,
  merge,
  repeat,
  switchMap,
  takeUntil,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { authFeature } from './auth.feature';
import { authActions } from './auth.actions';
import { isNull } from 'lodash';
import { APP_CONFIG } from '@libs/ng/core/config';

@Injectable()
export class AuthExtraEffects {
  #store = inject(Store);
  #config = inject(APP_CONFIG);
  #isLogged$ = this.#store.pipe(select(authFeature.selectIsLogged));
  #expiresAt$ = this.#store.pipe(select(authFeature.selectTokenExpiresAt));

  checkUserActivity$ = createEffect(
    () =>
      this.#isLogged$.pipe(
        filter((isLogged) => !!isLogged),
        exhaustMap(() => {
          const events$ = ['click', 'mousemove', 'mousedown', 'scroll', 'keypress'].map(
            (eventName) => fromEvent(document, eventName),
          );
          const activityIndicatorEvents$ = merge(...events$);
          const userInactivityTime = this.#config.userInactivityTime;
          if (!userInactivityTime)
            return throwError(() => new Error('Missing userInactivityTime config!'));

          return interval(userInactivityTime).pipe(
            takeUntil(activityIndicatorEvents$),
            repeat(),
            tap(() => this.#store.dispatch(authActions.logOut())),
          );
        }),
      ),
    { dispatch: false },
  );

  checkAccessTokenExpiry = createEffect(
    () =>
      this.#expiresAt$.pipe(
        filter((expiresAt) => !isNull(expiresAt)),
        switchMap((expiresAt) => {
          const diff = (expiresAt as number) - new Date().getTime();
          return timer(diff);
        }),
        tap(() => this.#store.dispatch(authActions.refreshToken())),
      ),
    { dispatch: false },
  );
}
