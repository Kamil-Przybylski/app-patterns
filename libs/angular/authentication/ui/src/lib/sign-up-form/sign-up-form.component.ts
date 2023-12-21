import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';
import { TFormGroup } from '@libs/ng/shared/utils';
import { UiNotificationComponent } from '@libs/ng/shared/shared/ui';

const passwordConfirming = (
  c: AbstractControl<ISignUpFormPayload['passwords']>,
): { invalid: boolean } | null => {
  const cPassword = c.get('password');
  const cRepeatPassword = c.get('repeatPassword');
  if (!cPassword || !cRepeatPassword) return null;

  if (cPassword.value !== cRepeatPassword.value) {
    cRepeatPassword?.setErrors({ notEqual: true });
    return { invalid: true };
  }
  cRepeatPassword?.setErrors(null);
  return null;
};

@Component({
  selector: 'authentication-ui-sign-up-form',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    UiNotificationComponent,
  ],
  templateUrl: './sign-up-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  @Input() set disabled(value: boolean) {
    if (value) this.loginForm.disable();
    else this.loginForm.enable();
  }
  @Input() errorMessage?: string;

  readonly #fb = inject(NonNullableFormBuilder);
  readonly #cd = inject(ChangeDetectorRef);

  readonly loginForm = this.#fb.group<TFormGroup<ISignUpFormPayload>>({
    username: this.#fb.control('', [Validators.required]),
    email: this.#fb.control('', [Validators.required, Validators.email]),
    passwords: this.#fb.group(
      {
        password: this.#fb.control('', [Validators.required]),
        repeatPassword: this.#fb.control(''),
      },
      { validators: passwordConfirming },
    ),
  });

  get usernameControl() {
    return this.loginForm.get('username');
  }
  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('passwords.password');
  }
  get repeatPasswordControl() {
    return this.loginForm.get('passwords.repeatPassword');
  }

  @Output() readonly bySubmit = new EventEmitter<ISignUpFormPayload>();

  submit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.getRawValue();
      this.bySubmit.emit(payload);
    } else {
      this.loginForm.markAllAsTouched();
      this.#cd.detectChanges();
    }
  }
}
