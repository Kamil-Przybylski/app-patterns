import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authPageRoutes } from './auth-page.routes';
import { AuthService, AuthStoreModule } from '@libs/angular/modules/auth';

@NgModule({
  imports: [RouterModule.forChild(authPageRoutes), AuthStoreModule],
  providers: [AuthService],
})
export class AuthPageModule {}
