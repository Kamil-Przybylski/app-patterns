import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';
import { LocalStorage } from '@libs/ng/shared/local-storage';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  exhaustMap,
  filter,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authActions } from '../store';

export const IS_REFRESHING = new InjectionToken<BehaviorSubject<boolean>>('IS_REFRESHING', {
  factory: () => new BehaviorSubject(false),
});

const handleReqAgain = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  isAuthPath: boolean,
): Observable<HttpEvent<unknown>> => {
  const token = LocalStorage.getItem('accessToken');
  if (token && !isAuthPath) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
};

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const actions = inject(Actions);
  const authService = inject(AuthService);
  const isRefreshing$ = inject(IS_REFRESHING);

  const isAuthPath = authService.isAuthPath(req.url);
  const refreshToken = LocalStorage.getItem('refreshToken');

  if (!refreshToken && !isAuthPath) {
    store.dispatch(authActions.logOut());
    return throwError(() => new Error('No refreshToken token!'));
  }

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing || isAuthPath),
    take(1),
    concatMap(() => handleReqAgain(req, next, isAuthPath)),
    catchError((err) => {
      if (isAuthPath || !(err instanceof HttpErrorResponse) || err.status !== 401)
        return throwError(() => err);

      isRefreshing$.next(true);
      store.dispatch(authActions.refreshToken());
      return actions.pipe(
        ofType(authActions.refreshTokenSuccess),
        take(1),
        tap(() => isRefreshing$.next(false)),
        exhaustMap(() => handleReqAgain(req, next, isAuthPath)),
        catchError((err) => {
          isRefreshing$.next(false);
          store.dispatch(authActions.logOut());
          return throwError(() => err);
        }),
      );
    }),
  );
};
