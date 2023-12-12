import { bootstrapApplication } from '@angular/platform-browser';
import { coreConfig } from './app/core/core.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, coreConfig).catch((err) => console.error(err));
