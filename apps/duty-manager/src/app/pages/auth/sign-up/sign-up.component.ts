import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ISignUpFormPayload, SignUpFormComponent, authActions } from '@libs/angular/modules/auth';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dm-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, MatCardModule, MatButtonModule],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  #store = inject(Store);

  public handleSubmit(payload: ISignUpFormPayload) {
    this.#store.dispatch(authActions.signUp({ payload }));
  }
}
