import { Route } from '@angular/router';
import { AuthRoutesEnum } from '@libs/shared/communication';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((c) => c.AppComponent),
  },
  {
    path: AuthRoutesEnum.AUTH,
    loadChildren: () => import('./pages/auth/auth-page.module').then((m) => m.AuthPageModule),
  },
];
