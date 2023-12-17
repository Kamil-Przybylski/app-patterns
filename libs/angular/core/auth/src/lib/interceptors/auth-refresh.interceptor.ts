import { InjectionToken, inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
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
import { Store } from '@ngrx/store';
import { authActions } from '../store';
import { Actions, ofType } from '@ngrx/effects';
import { LocalStorage } from '@libs/ng/shared/local-storage';

export const IS_REFRESHING = new InjectionToken<BehaviorSubject<boolean>>('IS_REFRESHING', {
  factory: () => new BehaviorSubject(false),
});

const handleReqAgain = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const token = LocalStorage.getItem('accessToken');
  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(request);
};

export const authRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const actions = inject(Actions);
  const authService = inject(AuthService);
  const isRefreshing$ = inject(IS_REFRESHING);

  const isInvalidPath = !authService.validPath(req.url);
  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing || isInvalidPath),
    take(1),
    concatMap(() => handleReqAgain(req, next)),
    catchError((err) => {
      if (isInvalidPath || !(err instanceof HttpErrorResponse) || err.status !== 401)
        return throwError(() => err);

      isRefreshing$.next(true);
      store.dispatch(authActions.refreshToken());
      return actions.pipe(
        ofType(authActions.refreshTokenSuccess),
        take(1),
        tap(() => isRefreshing$.next(false)),
        exhaustMap(() => handleReqAgain(req, next)),
        catchError((err) => {
          isRefreshing$.next(false);
          store.dispatch(authActions.logOut());
          return throwError(() => err);
        }),
      );
    }),
  );
};
