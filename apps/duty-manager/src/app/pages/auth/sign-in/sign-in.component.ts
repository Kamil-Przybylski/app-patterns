import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ISignInFormPayload, SignInFormComponent, authActions } from '@libs/angular/modules/auth';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dm-sign-in',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, MatCardModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  #store = inject(Store);

  public handleSubmit(payload: ISignInFormPayload) {
    this.#store.dispatch(authActions.signIn({ payload }));
  }

  public test() {
    this.#store.dispatch(authActions.test());
  }
}
