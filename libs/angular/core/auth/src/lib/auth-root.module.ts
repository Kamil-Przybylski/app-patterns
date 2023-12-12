import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './store/auth.feature';
import { getAuthInterceptor, getAuthRefreshInterceptor } from './interceptors';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { getAuthInitialProvider } from './initializer';
import { AuthExtraEffects } from './store';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeature.name, authFeature.reducer),
    EffectsModule.forFeature([AuthEffects, AuthExtraEffects]),
  ],
  providers: [getAuthInitialProvider(), getAuthInterceptor(), getAuthRefreshInterceptor()],
})
export class AuthRootModule {}