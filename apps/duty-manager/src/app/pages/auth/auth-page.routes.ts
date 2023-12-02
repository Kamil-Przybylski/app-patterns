import { Route } from '@angular/router';
import { AuthRoutesEnum } from '@libs/shared/communication';

export const authPageRoutes: Route[] = [
  {
    path: '',
    redirectTo: AuthRoutesEnum.SING_UP,
    pathMatch: 'full',
  },
  {
    path: AuthRoutesEnum.SING_IN,
    loadComponent: () => import('./sign-in/sign-in.component').then((c) => c.SignInComponent),
  },
  {
    path: AuthRoutesEnum.SING_UP,
    loadComponent: () => import('./sign-up/sign-up.component').then((c) => c.SignUpComponent),
  },
];
