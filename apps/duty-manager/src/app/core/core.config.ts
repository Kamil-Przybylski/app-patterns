import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../app.routes';
import { CoreModule } from './core.module';
import { provideAnimations } from '@angular/platform-browser/animations';

export const coreConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(), importProvidersFrom([CoreModule])],
};
