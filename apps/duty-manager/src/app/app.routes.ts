import { Route } from '@angular/router';
import { AuthRoutesEnum } from '@libs/shared/communication';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: AuthRoutesEnum.SING_IN,
    pathMatch: 'full',
  },
  {
    path: AuthRoutesEnum.SING_IN,
    loadComponent: () =>
      import('./pages/auth/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: AuthRoutesEnum.SING_UP,
    loadComponent: () =>
      import('./pages/auth/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
];
