import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SignUpFormComponent } from '@libs/ng/authentication/ui';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dm-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, SignUpFormComponent, MatCardModule, MatButtonModule],
  providers: [AuthenticationFacade],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  #authenticationFacade = inject(AuthenticationFacade);

  public handleSubmit(payload: ISignUpFormPayload) {
    this.#authenticationFacade.signUp(payload);
  }
}
