import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { AuthRoutesEnum, ISignInDto, ISignUpDto } from '@libs/shared/communication';
import { HttpErrorResponse } from '@angular/common/http';
import { authActions } from '@libs/ng/core/auth';
import { Router } from '@angular/router';
import { CallStatusEnum, CallStatusState, StoreUtils } from '@libs/ng/shared/utils';

interface AuthenticationState {
  callStatus: CallStatusState;
}

const INITIAL_STATE: AuthenticationState = {
  callStatus: CallStatusEnum.INIT,
};

@Injectable()
export class AuthenticationFacade extends ComponentStore<AuthenticationState> {
  #authenticationService = inject(AuthenticationService);
  #router = inject(Router);
  #store = inject(Store);

  constructor() {
    super(INITIAL_STATE);
  }

  readonly signIn = this.effect((payload$: Observable<ISignInDto>) =>
    payload$.pipe(
      switchMap((payload) => {
        this.patchState({ callStatus: CallStatusEnum.LOADING });
        return this.#authenticationService.signIn(payload).pipe(
          tapResponse(
            (dto) => {
              this.patchState({ callStatus: CallStatusEnum.LOADED });
              this.#store.dispatch(authActions.logIn({ payload: dto }));
              this.#router.navigate(['']);
            },
            (error: HttpErrorResponse) =>
              this.patchState({ callStatus: { errorMessage: error.statusText } }),
          ),
        );
      }),
    ),
  );

  readonly signUp = this.effect((payload$: Observable<ISignUpDto>) =>
    payload$.pipe(
      switchMap((payload) => {
        this.patchState({ callStatus: CallStatusEnum.LOADING });
        return this.#authenticationService.signUp(payload).pipe(
          tapResponse(
            () => {
              this.patchState({ callStatus: CallStatusEnum.LOADED });
              this.#router.navigate([AuthRoutesEnum.AUTH, AuthRoutesEnum.SING_IN]);
            },
            (error: HttpErrorResponse) =>
              this.patchState({ callStatus: { errorMessage: error.statusText } }),
          ),
        );
      }),
    ),
  );

  readonly signInCallState$: Observable<CallStatusState> = this.select((state) => state.callStatus);

  readonly isSignInLoading$: Observable<boolean> = this.select(
    this.signInCallState$,
    (signInCallState) => signInCallState === CallStatusEnum.LOADING,
  );

  readonly errorMessage$: Observable<string | undefined> = this.select(
    this.signInCallState$,
    (signInCallState) => StoreUtils.getCallStateError(signInCallState),
  );
}
