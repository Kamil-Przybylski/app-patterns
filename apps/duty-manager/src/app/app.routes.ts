import { Route } from '@angular/router';
import { AuthRoutesEnum } from '@libs/shared/communication';
import { authGuardFunction } from '@libs/ng/core/auth';
import { authenticationGuardFunction } from '@libs/ng/authentication/utils';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [authGuardFunction],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: AuthRoutesEnum.AUTH,
    canActivate: [authenticationGuardFunction],
    loadChildren: () =>
      import('./pages/authentication/authentication-page.routes').then(
        (m) => m.authenticationPageRoutes,
      ),
  },
];
