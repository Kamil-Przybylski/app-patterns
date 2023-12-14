import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { RouterModule } from '@angular/router';
import { SignUpFormComponent } from '@libs/ng/authentication/ui';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';

@Component({
  selector: 'authentication-feature-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, SignUpFormComponent, MatCardModule, MatButtonModule],
  providers: [AuthenticationFacade],
  templateUrl: './feature-sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSignUpComponent {
  #authenticationFacade = inject(AuthenticationFacade);

  public handleSubmit(payload: ISignUpFormPayload) {
    this.#authenticationFacade.signUp(payload);
  }
}
