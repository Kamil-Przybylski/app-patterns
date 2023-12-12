import { createFeature, createReducer, on } from '@ngrx/store';
import { IUser } from '../models/auth.models';
import { AUTH_FEATURE_KEY, authActions } from './auth.actions';
import { StoreUtils } from '@libs/ng/utils';
import { TokenUtils } from '@libs/shared/tokens';
import { IAccessTokenDto } from '@libs/shared/communication';

interface IState {
  user: IUser | null;
  isLogged: boolean | null;
  tokenExpiresAt: number | null;
}

const initialState: IState = {
  isLogged: null,
  user: null,
  tokenExpiresAt: null,
};

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(
      authActions.logIn,
      StoreUtils.patchState(({ payload }) => {
        const decoded = TokenUtils.decodeToken<IAccessTokenDto>(payload.accessToken);
        return { isLogged: true, user: decoded.user, tokenExpiresAt: decoded.expTime };
      }),
    ),
    on(authActions.logOut, StoreUtils.patchState({ isLogged: false, user: null })),

    on(
      authActions.refreshTokenSuccess,
      StoreUtils.patchState(({ payload }) => {
        const decoded = TokenUtils.decodeToken<IAccessTokenDto>(payload.accessToken);
        return { tokenExpiresAt: decoded.expTime };
      }),
    ),
  ),
});
