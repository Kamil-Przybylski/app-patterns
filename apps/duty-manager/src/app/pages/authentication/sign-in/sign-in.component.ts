import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SignInFormComponent } from '@libs/ng/authentication/ui';
import { ISignInFormPayload } from '@libs/ng/authentication/models';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dm-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, SignInFormComponent, MatCardModule, MatButtonModule],
  providers: [AuthenticationFacade],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  #authenticationFacade = inject(AuthenticationFacade);

  public handleSubmit(payload: ISignInFormPayload) {
    this.#authenticationFacade.signIn(payload);
  }
}
