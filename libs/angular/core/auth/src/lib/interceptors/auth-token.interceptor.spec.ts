import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorage } from '@libs/ng/shared/local-storage';
import { JwtToken } from '@libs/shared/models';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authActions } from '../store';
import { authTokenInterceptor } from './auth-token.interceptor';

const TOKEN = 'jwt.token' as JwtToken;
jest.mock('@libs/ng/shared/local-storage', () => ({
  LocalStorage: {
    getItem: jest.fn(),
  },
}));

export class StubAuthService {
  isAuthPath() {
    throw new Error('Method not implemented!');
  }
}

describe('authTokenInterceptor', () => {
  const actions$ = new Subject<Action>();
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideHttpClientTesting(),
        provideMockStore({ initialState: {} }),
        provideMockActions(() => actions$),
        { provide: AuthService, useClass: StubAuthService },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);

    (LocalStorage.getItem as jest.Mock).mockClear();
  });

  it('should add auth headers', () => {
    (LocalStorage.getItem as jest.Mock).mockReturnValue(TOKEN);
    jest.spyOn(authService, 'isAuthPath').mockReturnValue(false);

    const url = '/mock-endpoint';
    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${TOKEN}`);
  });

  it("shouldn't add auth headers for auth path", () => {
    (LocalStorage.getItem as jest.Mock).mockReturnValue(TOKEN);
    jest.spyOn(authService, 'isAuthPath').mockReturnValue(true);

    const url = '/auth/mock-endpoint';
    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Authorization')).toBe(null);
  });

  it('should throw error if no refreshToken', (done) => {
    (LocalStorage.getItem as jest.Mock).mockReturnValue(null);
    jest.spyOn(store, 'dispatch');
    jest.spyOn(authService, 'isAuthPath').mockReturnValue(false);

    const url = '/mock-endpoint';
    httpClient.get(url).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual('No refreshToken token!');
        expect(store.dispatch).toHaveBeenCalledWith(authActions.logOut());
        done();
      },
    });
  });

  describe('Refresh token flow', () => {
    beforeEach(() => {
      (LocalStorage.getItem as jest.Mock).mockReturnValue(TOKEN);
      jest.spyOn(store, 'dispatch');
      jest.spyOn(authService, 'isAuthPath').mockReturnValue(false);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should delay request until refreshed token', (done) => {
      const url = '/mock-endpoint';
      // fetch first request
      httpClient.get(url).subscribe({
        complete: () => {
          // expect correct complete request
          expect(store.dispatch).toHaveBeenCalledTimes(1);
          expect(store.dispatch).not.toHaveBeenCalledWith(authActions.logOut());
          done();
        },
      });

      // expect one request
      const req1 = httpTestingController.expectOne(url);
      // return 401 error
      req1.error(new ProgressEvent('error'), { status: 401 });

      // mock refreshTokenSuccess action
      expect(store.dispatch).toHaveBeenCalledWith(authActions.refreshToken());
      actions$.next(authActions.refreshTokenSuccess({ payload: { accessToken: TOKEN } }));

      // return success for request
      const req2 = httpTestingController.expectOne(url);
      req2.flush({});
      // expect added token
      expect(req2.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    });

    it('should delay every requests until refreshed token', (done) => {
      const url1 = '/mock-endpoint-1';
      const url2 = '/mock-endpoint-2';
      const url3 = '/mock-endpoint-3';

      // fetch first request
      httpClient.get(url1).subscribe({
        complete: () => {
          // expect correct complete request
          expect(store.dispatch).toHaveBeenCalledTimes(1);
          expect(store.dispatch).not.toHaveBeenCalledWith(authActions.logOut());
          done();
        },
      });

      // expect one request
      const req1 = httpTestingController.expectOne(url1);
      // return 401 error
      req1.error(new ProgressEvent('error'), { status: 401 });

      // fetch extra requests
      httpClient.get(url2).subscribe();
      httpClient.get(url3).subscribe();

      // expect that request haven't been fetched until refresh token
      httpTestingController.expectNone(url2);
      httpTestingController.expectNone(url3);
      // expect that authActions.refreshToken has been called once
      expect(store.dispatch).toHaveBeenCalledTimes(1);

      // mock refreshTokenSuccess action
      expect(store.dispatch).toHaveBeenCalledWith(authActions.refreshToken());
      actions$.next(authActions.refreshTokenSuccess({ payload: { accessToken: TOKEN } }));

      // return success for first request
      const req2 = httpTestingController.expectOne(url1);
      req2.flush({});

      // expect other request to be completed
      httpTestingController.expectOne(url2);
      httpTestingController.expectOne(url3);

      // expect added token
      expect(req2.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    });

    it('should logout if refreshed token failure', (done) => {
      const url = '/mock-endpoint';
      // fetch first request
      httpClient.get(url).subscribe({
        error: () => {
          // expect correct error handle
          expect(store.dispatch).toHaveBeenCalledWith(authActions.refreshToken());
          expect(store.dispatch).toHaveBeenCalledWith(authActions.logOut());
          done();
        },
      });

      // expect one request
      const req1 = httpTestingController.expectOne(url);
      // return 401 error
      req1.error(new ProgressEvent('error'), { status: 401 });

      // mock refreshTokenSuccess action
      actions$.next(authActions.refreshTokenSuccess({ payload: { accessToken: TOKEN } }));
      const req2 = httpTestingController.expectOne(url);
      // return 401 error again
      req2.error(new ProgressEvent('error'), { status: 401 });
    });
  });
});
