import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@libs/angular/utils';
import { provideHttpClient } from '@angular/common/http';

export const coreConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(), provideStore(), provideHttpClient()],
};
