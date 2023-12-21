import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureSignInComponent } from './feature-sign-in.component';
import { EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { Component } from '@angular/core';
import { AuthenticationFacade } from '@libs/ng/authentication/data-access';
import { StubAuthenticationFacade } from '@libs/ng/authentication/stubs-data-access';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'authentication-ui-sign-in-form',
  standalone: true,
  template: '',
})
export class StubSignInFormComponent {
  @Input() disabled?: boolean;
  @Input() errorMessage?: boolean;
  @Output() readonly bySubmit = new EventEmitter();
  submit() {}
}

describe('FeatureSignInComponent', () => {
  let component: FeatureSignInComponent;
  let fixture: ComponentFixture<FeatureSignInComponent>;
  let authFacade: AuthenticationFacade;

  beforeEach(async () => {
    TestBed.overrideComponent(FeatureSignInComponent, {
      set: {
        imports: [StubSignInFormComponent, RouterTestingModule],
        providers: [{ provide: AuthenticationFacade, useClass: StubAuthenticationFacade }],
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
    const formComponentDe = fixture.debugElement.query(By.directive(StubSignInFormComponent));
    const formComponent: StubSignInFormComponent = formComponentDe.componentInstance;
    jest.spyOn(formComponent, 'submit');
    jest.spyOn(authFacade, 'signIn');

    const submitBtn = fixture.debugElement.query(By.css('[data-tid="submit-btn"]'));
    submitBtn.nativeElement.click();
    formComponentDe.triggerEventHandler('bySubmit', { email: 'em', password: 'pass' });

    expect(formComponent.submit).toHaveBeenCalledTimes(1);
    expect(authFacade.signIn).toHaveBeenCalledTimes(1);
    expect(authFacade.signIn).toHaveBeenCalledWith({ email: 'em', password: 'pass' });
  });
});
