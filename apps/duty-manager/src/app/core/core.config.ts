import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../app.routes';
import { CoreModule } from './core.module';

export const coreConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), importProvidersFrom([CoreModule])],
};
