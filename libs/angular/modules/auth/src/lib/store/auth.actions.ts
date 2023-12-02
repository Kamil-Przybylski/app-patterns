import { CallStatusErrorState } from '@libs/angular/utils';
import { createActionGroup, props } from '@ngrx/store';
import { IUser } from '../models/auth.models';
import { SignInDto, SignUpDto } from '../models/auth.dtos';

export const AUTH_FEATURE_KEY = 'auth';

export const authActions = createActionGroup({
  source: AUTH_FEATURE_KEY,
  events: {
    'Sign Up': props<{ payload: SignUpDto }>(),
    'Sign Up Success': props<{ payload: IUser }>(),
    'Sign Up Error': props<{ payload: CallStatusErrorState }>(),

    'Sign In': props<{ payload: SignInDto }>(),
    'Sign In Success': props<{ payload: IUser }>(),
    'Sign In Error': props<{ payload: CallStatusErrorState }>(),
  },
});
