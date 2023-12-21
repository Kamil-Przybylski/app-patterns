import { delay, of, skip, take, throwError, toArray } from 'rxjs';
import { AuthenticationFacade } from './authentication.facade';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../services/authentication.service';
import {
  AuthRoutesEnum,
  ISignInDto,
  ISignInResponseDto,
  ISignUpDto,
  IUserDto,
} from '@libs/shared/communication';
import { provideMockStore } from '@ngrx/store/testing';
import { CallStatusEnum } from '@libs/ng/shared/utils';
import { Store } from '@ngrx/store';
import { authActions } from '@libs/ng/core/auth';
import { Router } from '@angular/router';
import { StubAuthenticationService } from '../../tests';

const getPayload = (): ISignInDto => ({ email: 'test', password: 'pass' });
const getResponse = (): ISignInResponseDto => ({
  user: {} as IUserDto,
  accessToken: '',
  refreshToken: '',
});

describe('AuthenticationFacade', () => {
  let authFacade: AuthenticationFacade;
  let authService: AuthenticationService;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationFacade,
        provideMockStore({ initialState: {} }),
        { provide: AuthenticationService, useClass: StubAuthenticationService },
      ],
    });
    authFacade = TestBed.inject(AuthenticationFacade);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should have an initial state', (done) => {
    authFacade.state$.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual({ callStatus: CallStatusEnum.INIT });
      done();
    });
  });

  describe('actions and effects', () => {
    it('should correct signIn() process', (done) => {
      // Given
      const payload = getPayload();
      const response = { user: {} as IUserDto, accessToken: '', refreshToken: '' };
      jest.spyOn(authService, 'signIn').mockReturnValue(of(response));
      jest.spyOn(store, 'dispatch');
      jest.spyOn(router, 'navigate');

      // Then - delay time for complete the tapResponse's script
      authFacade.state$.pipe(skip(2), delay(0), take(1)).subscribe((state) => {
        expect(state.callStatus).toEqual(CallStatusEnum.LOADED);
        expect(authService.signIn).toHaveBeenCalledTimes(1);
        expect(authService.signIn).toHaveBeenCalledWith(payload);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(authActions.logIn({ payload: response }));
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['']);
        done();
      });

      // When
      authFacade.signIn(payload);
    });

    it('should correct signUp() process', (done) => {
      // Given
      const payload: ISignUpDto = { username: 'user', password: 'pass', email: 'em' };
      jest.spyOn(authService, 'signUp').mockReturnValue(of({} as IUserDto));
      jest.spyOn(router, 'navigate');

      // Then - delay time for tapResponse end the script
      authFacade.state$.pipe(skip(2), delay(0), take(1)).subscribe((state) => {
        expect(state.callStatus).toEqual(CallStatusEnum.LOADED);
        expect(authService.signUp).toHaveBeenCalledTimes(1);
        expect(authService.signUp).toHaveBeenCalledWith(payload);
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith([AuthRoutesEnum.AUTH, AuthRoutesEnum.SING_IN]);
        done();
      });

      // When
      authFacade.signUp(payload);
    });
  });

  describe('selectors', () => {
    it('should correct return signInCallState$', (done) => {
      // Given
      const payload = getPayload();
      const response = getResponse();
      jest.spyOn(authService, 'signIn').mockReturnValue(of(response));

      // THEN
      authFacade.signInCallState$.pipe(skip(1), take(2), toArray()).subscribe((callStates) => {
        expect(callStates[0]).toEqual(CallStatusEnum.LOADING);
        expect(callStates[1]).toEqual(CallStatusEnum.LOADED);
        done();
      });

      // WHEN
      authFacade.signIn(payload);
    });

    it('should correct return isSignInLoading$', (done) => {
      // Given
      const payload = getPayload();
      const response = getResponse();
      jest.spyOn(authService, 'signIn').mockReturnValue(of(response));

      // THEN
      authFacade.isSignInLoading$.pipe(take(3), toArray()).subscribe((callStates) => {
        expect(callStates[0]).toEqual(false);
        expect(callStates[1]).toEqual(true);
        expect(callStates[2]).toEqual(false);
        done();
      });

      // WHEN
      authFacade.signIn(payload);
    });

    it('should correct return errorMessage$', (done) => {
      // Given
      const payload = getPayload();
      const response = { statusText: 'error-message' };
      jest.spyOn(authService, 'signIn').mockImplementation(() => throwError(() => response));

      // THEN
      authFacade.errorMessage$.pipe(skip(1), take(1)).subscribe((errorMessage) => {
        expect(errorMessage).toEqual(response.statusText);
        done();
      });

      // WHEN
      authFacade.signIn(payload);
    });
  });
});
