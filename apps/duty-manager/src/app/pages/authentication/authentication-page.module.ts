import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationPageRoutes } from './authentication-page.routes';

@NgModule({
  imports: [RouterModule.forChild(authenticationPageRoutes)],
})
export class AuthenticationPageModule {}
