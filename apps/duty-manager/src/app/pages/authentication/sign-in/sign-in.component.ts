import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureSignInComponent } from '@libs/ng/authentication/feature-sign-in';

@Component({
  selector: 'dm-sign-in',
  imports: [FeatureSignInComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <authentication-feature-sign-in />
    </div>
  `,
})
export class SignInComponent {}
