import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { SignInFormComponent } from '@libs/ng/authentication/ui';
import { ISignInFormPayload } from '@libs/ng/authentication/models';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'authentication-feature-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    SignInFormComponent,
  ],
  providers: [AuthenticationFacade],
  templateUrl: './feature-sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSignInComponent {
  readonly authenticationFacade = inject(AuthenticationFacade);

  readonly isLoading: Signal<boolean> = this.authenticationFacade.isSignInLoading;
  readonly errorMessage: Signal<string | undefined> = this.authenticationFacade.errorMessage;

  handleSubmit(payload: ISignInFormPayload) {
    this.authenticationFacade.signIn(payload);
  }
}
