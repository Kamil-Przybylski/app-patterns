import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureSignUpComponent } from '@libs/ng/authentication/feature-sign-up';

@Component({
  selector: 'dm-sign-up',
  imports: [FeatureSignUpComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <authentication-feature-sign-up />
    </div>
  `,
})
export class SignUpComponent {}
