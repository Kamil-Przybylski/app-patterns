import { JwtToken } from '@libs/shared/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AUTH_FEATURE_KEY = 'auth';

export const authActions = createActionGroup({
  source: AUTH_FEATURE_KEY,
  events: {
    'Log In': props<{ payload: { accessToken: JwtToken; refreshToken: JwtToken } }>(),

    'Log Out': emptyProps(),
    'Log Out Execute': emptyProps(),

    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ payload: { accessToken: JwtToken } }>(),
  },
});
