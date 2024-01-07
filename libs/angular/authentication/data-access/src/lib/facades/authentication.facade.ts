import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authActions } from '@libs/ng/core/auth';
import { CallStatusEnum, CallStatusState, StoreUtils } from '@libs/ng/shared/utils';
import { AuthRoutesEnum, ISignInReqDto, ISignUpReqDto } from '@libs/shared/communication';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../services';

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

  readonly signIn = this.effect((payload$: Observable<ISignInReqDto>) =>
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

  readonly signUp = this.effect((payload$: Observable<ISignUpReqDto>) =>
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

  readonly signInCallState: Signal<CallStatusState> = this.selectSignal(
    (state) => state.callStatus,
  );

  readonly isSignInLoading: Signal<boolean> = this.selectSignal(
    this.signInCallState,
    (signInCallState) => signInCallState === CallStatusEnum.LOADING,
  );

  readonly errorMessage: Signal<string | undefined> = this.selectSignal(
    this.signInCallState,
    (signInCallState) => StoreUtils.getCallStateError(signInCallState),
  );
}
