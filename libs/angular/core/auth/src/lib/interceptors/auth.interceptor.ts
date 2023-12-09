import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';

@Injectable()
class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = LocalStorageUtils.getItem(LocalStorageKeys.ACCESS_TOKEN);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}

export const getAuthInterceptor = () => ({
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
});
