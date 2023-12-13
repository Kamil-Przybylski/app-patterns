import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { AuthRoutesEnum } from '@libs/shared/communication';
import { provideAppConfig } from '@libs/ng/core/config';
import { provideStoreRoot } from '@libs/ng/core/store';
import { authProvider } from '@libs/ng/core/auth';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),

    provideStoreRoot(),
    provideAppConfig(environment),
    authProvider({ authGuardRedirectPath: [AuthRoutesEnum.AUTH] }),
  ],
};
