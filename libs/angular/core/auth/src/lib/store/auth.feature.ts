import { StoreUtils } from '@libs/ng/shared/utils';
import { UserId } from '@libs/shared/models';
import { ITokenPayloadDto, TokenUtils } from '@libs/shared/tokens';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AUTH_FEATURE_KEY, authActions } from './auth.actions';

interface IState {
  userId: UserId | null;
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
        const decoded = TokenUtils.decodeToken<ITokenPayloadDto>(payload.accessToken);
        return { isLogged: true, userId: decoded.sub, tokenExpiresAt: decoded.expTime };
      }),
    ),
    on(authActions.logOutExecute, StoreUtils.patchState({ isLogged: false, userId: null })),

    on(
      authActions.refreshTokenSuccess,
      StoreUtils.patchState(({ payload }) => {
        const decoded = TokenUtils.decodeToken<ITokenPayloadDto>(payload.accessToken);
        return { tokenExpiresAt: decoded.expTime };
      }),
    ),
  ),
});
