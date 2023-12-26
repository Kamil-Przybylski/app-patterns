import { of } from 'rxjs';

export class AuthenticationFacade {
  isSignInLoading$ = of(false);
  errorMessage$ = of(undefined);
  signIn() {}
  signUp() {}
}
