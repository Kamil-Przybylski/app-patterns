import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { TFormGroup } from '@libs/angular/utils';
import { FormControlsEnum, ISignUpFormPayload } from '../../models/auth-form.models';

@Component({
  selector: 'auth-sign-up-form',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './sign-up-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cd = inject(ChangeDetectorRef);

  public readonly loginForm = this.fb.group<TFormGroup<ISignUpFormPayload>>({
    username: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
    repeatPassword: this.fb.control('', [Validators.required]),
  });

  public get usernameControl() {
    return this.loginForm.get(FormControlsEnum.USERNAME);
  }
  public get emailControl() {
    return this.loginForm.get(FormControlsEnum.EMAIL);
  }
  public get passwordControl() {
    return this.loginForm.get(FormControlsEnum.PASSWORD);
  }
  public get repeatPasswordControl() {
    return this.loginForm.get(FormControlsEnum.REPEAT_PASSWORD);
  }

  @Output() public readonly bySubmit = new EventEmitter<ISignUpFormPayload>();

  public submit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.getRawValue();
      this.bySubmit.emit(payload);
    } else {
      this.loginForm.markAllAsTouched();
      this.cd.detectChanges();
    }
  }
}
