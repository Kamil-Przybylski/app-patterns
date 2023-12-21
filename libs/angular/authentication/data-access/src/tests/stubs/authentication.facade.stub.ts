import { of } from 'rxjs';

export class StubAuthenticationFacade {
  isSignInLoading$ = of(false);
  errorMessage$ = of(undefined);
  signIn() {}
}
