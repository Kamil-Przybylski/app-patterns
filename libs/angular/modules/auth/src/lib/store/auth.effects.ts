import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  #actions$ = inject(Actions);
  #authService = inject(AuthService);

  signUp$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(authActions.signUp),
      exhaustMap(({ payload }) =>
        this.#authService.signUp(payload).pipe(
          map((user) => authActions.signUpSuccess({ payload: user })),
          catchError((err) => of(authActions.signUpError({ payload: { errorMessage: err.message } })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(authActions.signIn),
      exhaustMap(({ payload }) =>
        this.#authService.signIn(payload).pipe(
          map((user) => authActions.signInSuccess({ payload: user })),
          catchError((err) => of(authActions.signInError({ payload: { errorMessage: err.message } })))
        )
      )
    )
  );
}
