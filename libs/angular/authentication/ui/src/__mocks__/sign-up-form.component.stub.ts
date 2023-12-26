import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'authentication-ui-sign-up-form',
  standalone: true,
  template: '',
})
export class SignUpFormComponent {
  @Input() disabled?: boolean;
  @Input() errorMessage?: boolean;
  @Output() readonly bySubmit = new EventEmitter();
  submit() {
    throw new Error('Method not implemented!');
  }
}
