import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const provideStoreRoot = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideStore(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      },
    ),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 100 }),
  ]);
};
