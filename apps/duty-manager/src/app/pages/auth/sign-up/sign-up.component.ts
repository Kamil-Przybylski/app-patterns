import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISignInFormPayload, SignUpFormComponent } from '@libs/angular/modules/auth';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dm-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, MatCardModule, MatButtonModule],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  public handleSubmit(payload: ISignInFormPayload) {
    console.log(666, payload);
  }
}
