import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { ISignInFormPayload } from '@libs/ng/authentication/models';
import { SignInFormComponent } from '@libs/ng/authentication/ui';
import { FeatureSignInComponent } from './feature-sign-in.component';

jest.mock('@libs/ng/authentication/data-access');
jest.mock('@libs/ng/authentication/ui');

describe('FeatureSignInComponent', () => {
  let component: FeatureSignInComponent;
  let fixture: ComponentFixture<FeatureSignInComponent>;
  let authFacade: AuthenticationFacade;

  beforeEach(async () => {
    TestBed.overrideComponent(FeatureSignInComponent, {
      set: {
        imports: [SignInFormComponent, RouterTestingModule],
        providers: [AuthenticationFacade, provideNoopAnimations()],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(FeatureSignInComponent);
    component = fixture.componentInstance;
    authFacade = fixture.componentRef.injector.get(AuthenticationFacade);
    fixture.detectChanges();
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
    const payload: ISignInFormPayload = {
      email: 'em',
      password: 'pass',
    };
    const formComponentDe = fixture.debugElement.query(By.directive(SignInFormComponent));
    const formComponent: SignInFormComponent = formComponentDe.componentInstance;
    jest.spyOn(formComponent, 'submit').mockImplementation(() => null);
    jest.spyOn(authFacade, 'signIn');

    const submitBtn = fixture.debugElement.query(By.css('[data-tid="submit-btn"]'));
    submitBtn.nativeElement.click();
    formComponentDe.triggerEventHandler('bySubmit', payload);

    expect(formComponent.submit).toHaveBeenCalledTimes(1);
    expect(authFacade.signIn).toHaveBeenCalledTimes(1);
    expect(authFacade.signIn).toHaveBeenCalledWith(payload);
  });
});
