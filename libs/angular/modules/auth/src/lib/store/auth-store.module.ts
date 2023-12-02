import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './auth.feature';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';

@NgModule({
  imports: [StoreModule.forFeature(authFeature.name, authFeature.reducer), EffectsModule.forFeature(AuthEffects)],
})
export class AuthStoreModule {}
