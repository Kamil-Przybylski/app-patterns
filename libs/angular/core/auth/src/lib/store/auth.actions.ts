import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AUTH_FEATURE_KEY = 'auth';

export const authActions = createActionGroup({
  source: AUTH_FEATURE_KEY,
  events: {
    'Log In': props<{ payload: { accessToken: string; refreshToken: string } }>(),
    'Log Out': emptyProps(),

    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ payload: { accessToken: string } }>(),
  },
});
