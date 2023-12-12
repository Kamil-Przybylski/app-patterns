import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AUTH_REDIRECT_TOKEN, AuthRootModule } from '@libs/ng/core/auth';
import { APP_CONFIG } from '@libs/ng/core/config';
import { StoreRootModule } from '@libs/ng/core/store';
import { AuthRoutesEnum } from '@libs/shared/communication';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [HttpClientModule, BrowserAnimationsModule, StoreRootModule, AuthRootModule],
  providers: [
    HttpClientModule,
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    {
      provide: AUTH_REDIRECT_TOKEN,
      useValue: AuthRoutesEnum.AUTH,
    },
  ],
})
export class CoreModule {}
