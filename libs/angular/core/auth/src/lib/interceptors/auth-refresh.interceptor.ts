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

@Injectable()
class AuthRefreshInterceptor implements HttpInterceptor {
  #isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  #authService = inject(AuthService);

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
    const refreshToken = LocalStorageUtils.getItem(LocalStorageKeys.REFRESH_TOKEN);
    if (
      refreshToken &&
      this.#authService.validPath(request.url) &&
      err instanceof HttpErrorResponse &&
      err.status === 401
    ) {
      this.#isRefreshing$.next(true);
      return this.#authService.refreshToken({ refreshToken }).pipe(
        tap((res) => {
          LocalStorageUtils.setItem(LocalStorageKeys.ACCESS_TOKEN, res.accessToken);
          LocalStorageUtils.setItem(LocalStorageKeys.REFRESH_TOKEN, res.refreshToken);
          this.#isRefreshing$.next(false);
        }),
        exhaustMap(() => this.handleReqAgain(request, next)),
        catchError((err) => {
          this.#isRefreshing$.next(false);
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
