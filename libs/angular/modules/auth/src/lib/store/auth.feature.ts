import { createFeature, createReducer, on } from '@ngrx/store';
import { IUser } from '../models/auth.models';
import { CallStatusEnum, CallStatusState } from '@libs/angular/utils';
import { AUTH_FEATURE_KEY, authActions } from './auth.actions';

interface State {
  token: string | null;
  user: IUser | null;
  signUpStatus: CallStatusState;
  signInStatus: CallStatusState;
}

const initialState: State = {
  token: null,
  user: null,
  signUpStatus: CallStatusEnum.INIT,
  signInStatus: CallStatusEnum.INIT,
};

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,

    on(authActions.signUp, (state) => ({
      ...state,
      signUpStatus: CallStatusEnum.LOADING,
    })),
    on(authActions.signUpSuccess, (state, { payload }) => ({
      ...state,
      user: payload,
      signUpStatus: CallStatusEnum.LOADED,
    })),
    on(authActions.signUpError, (state, { payload }) => ({
      ...state,
      signUpStatus: payload,
    })),

    on(authActions.signIn, (state) => ({
      ...state,
      signInStatus: CallStatusEnum.LOADING,
    })),
    on(authActions.signInSuccess, (state, { payload }) => ({
      ...state,
      user: payload,
      signInStatus: CallStatusEnum.LOADED,
    })),
    on(authActions.signInError, (state, { payload }) => ({
      ...state,
      signInStatus: payload,
    }))
  ),
});
