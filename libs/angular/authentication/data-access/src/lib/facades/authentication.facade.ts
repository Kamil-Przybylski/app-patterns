import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { ISignInDto, ISignUpDto } from '@libs/shared/communication';
import { HttpErrorResponse } from '@angular/common/http';
import { authActions } from '@libs/ng/core/auth';
import { CallStatusEnum, CallStatusState } from '@libs/ng/utils';

interface AuthenticationState {
  signInCallStatus: CallStatusState;
  signUpCallStatus: CallStatusState;
}

const INITIAL_STATE: AuthenticationState = {
  signInCallStatus: CallStatusEnum.INIT,
  signUpCallStatus: CallStatusEnum.INIT,
};

@Injectable()
export class AuthenticationFacade extends ComponentStore<AuthenticationState> {
  #authenticationService = inject(AuthenticationService);
  #store = inject(Store);

  constructor() {
    super(INITIAL_STATE);
  }

  readonly signIn = this.effect((payload$: Observable<ISignInDto>) =>
    payload$.pipe(
      switchMap((payload) =>
        this.#authenticationService.signIn(payload).pipe(
          tapResponse(
            (dto) => {
              this.#store.dispatch(authActions.logIn({ payload: dto }));
              this.patchState({ signInCallStatus: CallStatusEnum.LOADED });
            },
            (error: HttpErrorResponse) =>
              this.patchState({ signInCallStatus: { errorMessage: error.message } }),
          ),
        ),
      ),
    ),
  );

  readonly signUp = this.effect((payload$: Observable<ISignUpDto>) =>
    payload$.pipe(
      switchMap((payload) =>
        this.#authenticationService.signUp(payload).pipe(
          tapResponse(
            () => {
              this.patchState({ signUpCallStatus: CallStatusEnum.LOADED });
            },
            (error: HttpErrorResponse) =>
              this.patchState({ signUpCallStatus: { errorMessage: error.message } }),
          ),
        ),
      ),
    ),
  );
}
