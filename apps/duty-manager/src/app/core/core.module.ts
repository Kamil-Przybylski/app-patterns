import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AUTH_REDIRECT_TOKEN, AuthRootModule } from '@libs/ng/core/auth';
import { StoreRootModule } from '@libs/ng/core/store';
import { AuthRoutesEnum } from '@libs/shared/communication';

@NgModule({
  imports: [HttpClientModule, BrowserAnimationsModule, StoreRootModule, AuthRootModule],
  providers: [
    HttpClientModule,
    {
      provide: AUTH_REDIRECT_TOKEN,
      useValue: AuthRoutesEnum.AUTH,
    },
  ],
})
export class CoreModule {}
