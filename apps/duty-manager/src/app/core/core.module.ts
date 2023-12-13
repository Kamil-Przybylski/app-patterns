import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthRootModule, authProvider as authRedirectProvider } from '@libs/ng/core/auth';
import { StoreRootModule } from '@libs/ng/core/store';
import { AuthRoutesEnum } from '@libs/shared/communication';
import { environment } from '../../environments/environment';
import { provideAppConfig } from '@libs/ng/core/config';

@NgModule({
  imports: [HttpClientModule, StoreRootModule, AuthRootModule],
  providers: [
    HttpClientModule,
    provideAppConfig(environment),
    authRedirectProvider({ authGuardRedirectPath: [AuthRoutesEnum.AUTH] }),
  ],
})
export class CoreModule {}
