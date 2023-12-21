import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UiNotificationComponent } from '@libs/ng/shared/shared/ui';
import { SignUpFormComponent } from './sign-up-form.component';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';
import { StubUiNotificationComponent } from '@libs/ng/shared/shared/stubs-ui';

describe('SignInFormComponent', () => {
  let component: SignUpFormComponent;
  let componentRef: ComponentRef<SignUpFormComponent>;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(SignUpFormComponent, {
      add: { imports: [StubUiNotificationComponent] },
      remove: { imports: [UiNotificationComponent] },
    }).configureTestingModule({ providers: [provideNoopAnimations()] });

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct init the view', () => {
    const notification = fixture.debugElement.query(By.css('[data-tid="notification"]'));
    expect(notification).not.toBeTruthy();

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(4);

    const errors = fixture.debugElement.queryAll(By.css('[data-tid="error-message"]'));
    expect(errors.length).toBe(0);
  });

  it('should view errors and prevent emit after submit empty form', () => {
    jest.spyOn(component.bySubmit, 'emit');
    component.submit();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('[data-tid="error-message"]'));
    expect(errors.length).toBe(3);
    expect(component.bySubmit.emit).toHaveBeenCalledTimes(0);
  });

  it('should view error for email validation', () => {
    const emailInputDe = fixture.debugElement.query(By.css('[formControlName="email"]'));
    emailInputDe.nativeElement.focus();
    emailInputDe.nativeElement.value = 'wrong_email';
    emailInputDe.nativeElement.dispatchEvent(new Event('input'));
    emailInputDe.nativeElement.blur();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('[data-tid="error-message"]'));
    expect(errors.length).toBe(1);
    expect(errors[0].nativeElement.textContent).toBe('Wrong email format!');
  });

  it('should view error for passwordConfirming validation', () => {
    const passwordInputDe = fixture.debugElement.query(By.css('[formControlName="password"]'));
    passwordInputDe.nativeElement.focus();
    passwordInputDe.nativeElement.value = 'password1';
    passwordInputDe.nativeElement.dispatchEvent(new Event('input'));

    const repeatPasswordInputDe = fixture.debugElement.query(
      By.css('[formControlName="repeatPassword"]'),
    );
    repeatPasswordInputDe.nativeElement.focus();
    repeatPasswordInputDe.nativeElement.value = 'password2';
    repeatPasswordInputDe.nativeElement.dispatchEvent(new Event('input'));
    repeatPasswordInputDe.nativeElement.blur();

    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('[data-tid="error-message"]'));
    expect(errors.length).toBe(1);
    expect(errors[0].nativeElement.textContent).toBe('Password must be the same!');
  });

  it('should emit correct value', () => {
    jest.spyOn(component.bySubmit, 'emit');
    const expected: ISignUpFormPayload = {
      username: 'test',
      email: 'test@test.pl',
      passwords: {
        password: 'test',
        repeatPassword: 'test',
      },
    };

    const usernameInputDe = fixture.debugElement.query(By.css('[formControlName="username"]'));
    usernameInputDe.nativeElement.value = expected.username;
    usernameInputDe.nativeElement.focus();
    usernameInputDe.nativeElement.dispatchEvent(new Event('input'));

    const emailInputDe = fixture.debugElement.query(By.css('[formControlName="email"]'));
    emailInputDe.nativeElement.value = expected.email;
    emailInputDe.nativeElement.focus();
    emailInputDe.nativeElement.dispatchEvent(new Event('input'));

    const passwordInputDe = fixture.debugElement.query(By.css('[formControlName="password"]'));
    passwordInputDe.nativeElement.value = expected.passwords.password;
    passwordInputDe.nativeElement.focus();
    passwordInputDe.nativeElement.dispatchEvent(new Event('input'));

    const repeatPasswordInputDe = fixture.debugElement.query(
      By.css('[formControlName="repeatPassword"]'),
    );
    repeatPasswordInputDe.nativeElement.value = expected.passwords.repeatPassword;
    repeatPasswordInputDe.nativeElement.focus();
    repeatPasswordInputDe.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    component.submit();
    expect(component.bySubmit.emit).toHaveBeenCalledTimes(1);
    expect(component.bySubmit.emit).toHaveBeenCalledWith(expected);
  });

  it('should disable form', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.at(0)?.nativeElement.disabled).toBeTruthy();
    expect(inputs.at(1)?.nativeElement.disabled).toBeTruthy();
  });

  it('should show an error message', () => {
    const errorExpected = 'Error test';
    componentRef.setInput('errorMessage', errorExpected);
    fixture.detectChanges();

    const notification = fixture.debugElement.query(By.css('[data-tid="notification"]'));
    expect(notification).toBeTruthy();
    expect(notification.nativeElement.textContent).toBe(errorExpected);
  });
});
