import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';
import { SignUpFormComponent } from '@libs/ng/authentication/ui';
import { ISignUpReqDto } from '@libs/shared/communication';

@Component({
  selector: 'authentication-feature-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignUpFormComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [AuthenticationFacade],
  templateUrl: './feature-sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSignUpComponent {
  #authenticationFacade = inject(AuthenticationFacade);

  readonly isLoading = toSignal(this.#authenticationFacade.isSignInLoading$, {
    initialValue: false,
  });
  readonly errorMessage = toSignal(this.#authenticationFacade.errorMessage$);

  public handleSubmit(formPayload: ISignUpFormPayload) {
    const payload: ISignUpReqDto = {
      username: formPayload.username,
      email: formPayload.email,
      password: formPayload.passwords.password,
    };
    this.#authenticationFacade.signUp(payload);
  }
}
