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
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';
import { TFormGroup } from '@libs/ng/shared/utils';
import { UiNotificationComponent } from '@libs/ng/shared/shared/ui';

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
  @Input() error?: string;

  readonly #fb = inject(NonNullableFormBuilder);
  readonly #cd = inject(ChangeDetectorRef);

  readonly loginForm = this.#fb.group<TFormGroup<ISignUpFormPayload>>({
    username: this.#fb.control('test', [Validators.required]),
    email: this.#fb.control('test@test.pl', [Validators.required, Validators.email]),
    password: this.#fb.control('test', [Validators.required]),
    repeatPassword: this.#fb.control('test', [Validators.required]),
  });

  get usernameControl() {
    return this.loginForm.get('username');
  }
  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  get repeatPasswordControl() {
    return this.loginForm.get('repeatPassword');
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
