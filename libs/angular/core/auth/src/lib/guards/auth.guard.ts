import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { authFeature } from '../store/auth.feature';
import { AUTH_REDIRECT_PATH_TOKEN } from '../auth.token';

export const authGuardFunction: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const store = inject(Store);
  const redirect = inject(AUTH_REDIRECT_PATH_TOKEN);

  return store.pipe(
    select(authFeature.selectIsLogged),
    map((isLogged) => {
      if (!isLogged) router.navigate(redirect);
      return !!isLogged;
    }),
  );
};
