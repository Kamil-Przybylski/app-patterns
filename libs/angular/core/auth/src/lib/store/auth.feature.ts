import { createFeature, createReducer, on } from '@ngrx/store';
import { AUTH_FEATURE_KEY, authActions } from './auth.actions';
import { TokenUtils } from '@libs/shared/tokens';
import { IAccessTokenDto } from '@libs/shared/communication';
import { StoreUtils } from '@libs/ng/shared/utils';

interface IState {
  userId: number | null;
  isLogged: boolean | null;
  tokenExpiresAt: number | null;
}

const initialState: IState = {
  isLogged: null,
  userId: null,
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
        return { isLogged: true, userId: decoded.sub, tokenExpiresAt: decoded.expTime };
      }),
    ),
    on(authActions.logOutExecute, StoreUtils.patchState({ isLogged: false, userId: null })),

    on(
      authActions.refreshTokenSuccess,
      StoreUtils.patchState(({ payload }) => {
        const decoded = TokenUtils.decodeToken<IAccessTokenDto>(payload.accessToken);
        return { tokenExpiresAt: decoded.expTime };
      }),
    ),
  ),
});
