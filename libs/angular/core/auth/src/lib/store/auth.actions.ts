import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ISignInResponseDto } from '@libs/shared/communication';

export const AUTH_FEATURE_KEY = 'auth';

export const authActions = createActionGroup({
  source: AUTH_FEATURE_KEY,
  events: {
    'Log In': props<{ payload: ISignInResponseDto }>(),
    'Init Log In': props<{ payload: { accessToken: string; refreshToken: string } }>(),
    'Log Out': emptyProps(),
  },
});
