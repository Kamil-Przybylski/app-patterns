import { bootstrapApplication } from '@angular/platform-browser';
import { coreConfig } from './app/core/core.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, coreConfig).catch((err) => console.error(err));
