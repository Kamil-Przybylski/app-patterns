import { ComponentRef } from '@angular/core';
import { SignInFormComponent } from './sign-in-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UiNotificationComponent } from '@libs/ng/shared/shared/ui';
import { ISignInFormPayload } from '@libs/ng/authentication/models';
import { StubUiNotificationComponent } from '@libs/ng/shared/shared/stubs-ui';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let componentRef: ComponentRef<SignInFormComponent>;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(SignInFormComponent, {
      add: { imports: [StubUiNotificationComponent] },
      remove: { imports: [UiNotificationComponent] },
    }).configureTestingModule({ providers: [provideNoopAnimations()] });

    fixture = TestBed.createComponent(SignInFormComponent);
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
    expect(inputs.length).toBe(2);

    const errors = fixture.debugElement.queryAll(By.css('[data-tid="error-message"]'));
    expect(errors.length).toBe(0);
  });

  it('should view errors and prevent emit after submit empty form', () => {
    jest.spyOn(component.bySubmit, 'emit');
    component.submit();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('[data-tid="error-message"]'));
    expect(errors.length).toBe(2);
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

  it('should emit correct value', () => {
    jest.spyOn(component.bySubmit, 'emit');
    const expected: ISignInFormPayload = {
      email: 'test@test.pl',
      password: 'test',
    };

    const emailInputDe = fixture.debugElement.query(By.css('[formControlName="email"]'));
    emailInputDe.nativeElement.value = expected.email;
    emailInputDe.nativeElement.focus();
    emailInputDe.nativeElement.dispatchEvent(new Event('input'));

    const passwordInputDe = fixture.debugElement.query(By.css('[formControlName="password"]'));
    passwordInputDe.nativeElement.value = expected.password;
    passwordInputDe.nativeElement.focus();
    passwordInputDe.nativeElement.dispatchEvent(new Event('input'));

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
    const errorExpected = 'Error test x';
    componentRef.setInput('errorMessage', errorExpected);
    fixture.detectChanges();

    const notification = fixture.debugElement.query(By.css('[data-tid="notification"]'));
    expect(notification).toBeTruthy();
    expect(notification.nativeElement.textContent).toBe(errorExpected);
  });
});
