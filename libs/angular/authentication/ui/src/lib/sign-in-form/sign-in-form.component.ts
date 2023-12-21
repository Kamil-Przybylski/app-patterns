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
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ISignInFormPayload } from '@libs/ng/authentication/models';
import { TFormGroup } from '@libs/ng/shared/utils';
import { UiNotificationComponent } from '@libs/ng/shared/shared/ui';

@Component({
  selector: 'authentication-ui-sign-in-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    UiNotificationComponent,
  ],
  templateUrl: './sign-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent {
  @Input() set disabled(value: boolean) {
    if (value) this.loginForm.disable();
    else this.loginForm.enable();
  }
  @Input() errorMessage?: string;
  @Output() readonly bySubmit = new EventEmitter<ISignInFormPayload>();

  readonly #fb = inject(NonNullableFormBuilder);
  readonly #cd = inject(ChangeDetectorRef);

  readonly loginForm = this.#fb.group<TFormGroup<ISignInFormPayload>>({
    email: this.#fb.control('', [Validators.required, Validators.email]),
    password: this.#fb.control('', [Validators.required]),
  });

  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }

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
