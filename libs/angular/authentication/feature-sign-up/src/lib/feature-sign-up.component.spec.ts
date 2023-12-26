import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { ISignUpFormPayload } from '@libs/ng/authentication/models';
import { SignUpFormComponent } from '@libs/ng/authentication/ui';
import { FeatureSignUpComponent } from './feature-sign-up.component';

jest.mock('@libs/ng/authentication/data-access');
jest.mock('@libs/ng/authentication/ui');

describe('FeatureSignInComponent', () => {
  let component: FeatureSignUpComponent;
  let fixture: ComponentFixture<FeatureSignUpComponent>;
  let authFacade: AuthenticationFacade;

  beforeEach(async () => {
    TestBed.overrideComponent(FeatureSignUpComponent, {
      set: {
        imports: [SignUpFormComponent, RouterTestingModule],
        providers: [AuthenticationFacade, provideNoopAnimations()],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(FeatureSignUpComponent);
    component = fixture.componentInstance;
    authFacade = fixture.componentRef.injector.get(AuthenticationFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct init the view', () => {
    const submitBtn = fixture.debugElement.query(By.css('[data-tid="submit-btn"]'));
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.nativeElement.disabled).not.toBeTruthy();
  });

  it('should submit the form', () => {
    const payload: ISignUpFormPayload = {
      username: 'usr',
      email: 'em@ail',
      passwords: {
        password: 'pass',
        repeatPassword: 'pass',
      },
    };
    const formComponentDe = fixture.debugElement.query(By.directive(SignUpFormComponent));
    const formComponent: SignUpFormComponent = formComponentDe.componentInstance;
    jest.spyOn(formComponent, 'submit').mockImplementation(() => null);
    jest.spyOn(authFacade, 'signUp');

    const submitBtn = fixture.debugElement.query(By.css('[data-tid="submit-btn"]'));
    submitBtn.nativeElement.click();
    formComponentDe.triggerEventHandler('bySubmit', payload);

    expect(formComponent.submit).toHaveBeenCalledTimes(1);
    expect(authFacade.signUp).toHaveBeenCalledTimes(1);
    expect(authFacade.signUp).toHaveBeenCalledWith({
      username: payload.username,
      email: payload.email,
      password: payload.passwords.password,
    });
  });
});
