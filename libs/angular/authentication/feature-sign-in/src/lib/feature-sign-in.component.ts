import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { SignInFormComponent } from '@libs/ng/authentication/ui';
import { ISignInFormPayload } from '@libs/ng/authentication/models';

@Component({
  selector: 'authentication-feature-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, SignInFormComponent, MatCardModule, MatButtonModule],
  providers: [AuthenticationFacade],
  templateUrl: './feature-sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSignInComponent {
  #authenticationFacade = inject(AuthenticationFacade);

  public handleSubmit(payload: ISignInFormPayload) {
    this.#authenticationFacade.signIn(payload);
  }
}
