import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISignInFormPayload, SignInFormComponent } from '@libs/angular/modules/auth';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dm-sign-in',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, MatCardModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  public handleSubmit(payload: ISignInFormPayload) {
    console.log(666, payload);
  }
}
