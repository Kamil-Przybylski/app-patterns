import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authActions } from '@libs/ng/core/auth';
import { CallStatusEnum } from '@libs/ng/shared/utils';
import {
  AuthRoutesEnum,
  ISignInReqDto,
  ISignInResDto,
  ISignUpReqDto,
  IUserResDto,
} from '@libs/shared/communication';
import { JwtToken } from '@libs/shared/models';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { delay, of, skip, take, throwError, toArray } from 'rxjs';
import { AuthenticationService as StubService } from '../../__mocks__';
import { AuthenticationService } from './../services';
import { AuthenticationFacade } from './authentication.facade';

jest.mock('./../services');

const getPayload = (): ISignInReqDto => ({ email: 'test', password: 'pass' });
const getResponse = (): ISignInResDto => ({
  user: {} as IUserResDto,
  accessToken: '' as JwtToken,
  refreshToken: '' as JwtToken,
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
        { provide: AuthenticationService, useClass: StubService },
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
      const response = {
        user: {} as IUserResDto,
        accessToken: '' as JwtToken,
        refreshToken: '' as JwtToken,
      };
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
      const payload: ISignUpReqDto = { username: 'user', password: 'pass', email: 'em' };
      jest.spyOn(authService, 'signUp').mockReturnValue(of({} as IUserResDto));
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
