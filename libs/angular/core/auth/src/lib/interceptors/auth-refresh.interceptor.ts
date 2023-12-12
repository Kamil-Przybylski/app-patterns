import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
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
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';
import { Store } from '@ngrx/store';
import { authActions } from '../store';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
class AuthRefreshInterceptor implements HttpInterceptor {
  #store = inject(Store);
  #actions = inject(Actions);
  #authService = inject(AuthService);
  #isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.#isRefreshing$.pipe(
      filter((isRefreshing) => !isRefreshing || !this.#authService.validPath(request.url)),
      take(1),
      concatMap(() => this.handleReqAgain(request, next)),
      catchError((err) => this.handleRefreshToken(request, next, err)),
    );
  }

  private handleRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    err: unknown,
  ): Observable<HttpEvent<unknown>> {
    if (
      this.#authService.validPath(request.url) &&
      err instanceof HttpErrorResponse &&
      err.status === 401
    ) {
      this.#isRefreshing$.next(true);
      this.#store.dispatch(authActions.refreshToken());
      return this.#actions.pipe(
        ofType(authActions.refreshTokenSuccess),
        take(1),
        tap(() => this.#isRefreshing$.next(false)),
        exhaustMap(() => this.handleReqAgain(request, next)),
        catchError((err) => {
          this.#isRefreshing$.next(false);
          this.#store.dispatch(authActions.logOut());
          return throwError(() => err);
        }),
      );
    } else {
      return throwError(() => err);
    }
  }

  private handleReqAgain(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = LocalStorageUtils.getItem(LocalStorageKeys.ACCESS_TOKEN);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }
}

export const getAuthRefreshInterceptor = () => ({
  provide: HTTP_INTERCEPTORS,
  useClass: AuthRefreshInterceptor,
  multi: true,
});
