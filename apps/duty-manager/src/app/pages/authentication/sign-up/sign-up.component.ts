import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureSignUpComponent } from '@libs/ng/authentication/feature-sign-up';

@Component({
  selector: 'dm-sign-up',
  imports: [FeatureSignUpComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="t-w-full t-h-full t-flex t-items-center t-justify-center">
      <authentication-feature-sign-up />
    </div>
  `,
})
export class SignUpComponent {}
