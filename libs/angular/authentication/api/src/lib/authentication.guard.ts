import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authFeature } from '@libs/ng/core/auth';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

export const authenticationGuardFunction: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const store = inject(Store);

  return store.pipe(
    select(authFeature.selectIsLogged),
    map((isLogged) => {
      if (isLogged) router.navigate([]);
      return !isLogged;
    }),
  );
};
