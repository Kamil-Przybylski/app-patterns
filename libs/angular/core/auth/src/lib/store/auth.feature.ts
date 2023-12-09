import { createFeature, createReducer, on } from '@ngrx/store';
import { IUser } from '../models/auth.models';
import { AUTH_FEATURE_KEY, authActions } from './auth.actions';
import { StoreUtils } from '@libs/ng/utils';

interface IState {
  user: IUser | null;
  isLogged: boolean | null;
}

const initialState: IState = {
  isLogged: null,
  user: null,
};

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(
      authActions.logIn,
      StoreUtils.patchState(({ payload }) => ({ isLogged: true, user: payload.user })),
    ),
    on(
      authActions.initLogIn,
      StoreUtils.patchState(() => ({ isLogged: true, user: {} as IUser })),
    ),
    on(authActions.logOut, StoreUtils.patchState({ isLogged: false, user: null })),
  ),
});
