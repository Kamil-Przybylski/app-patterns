import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, mergeMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeature } from '../store/auth.feature';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  #store = inject(Store);
  #token$: Observable<string | null> = this.#store.select(authFeature.selectAccessToken);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.#token$.pipe(
      take(1),
      mergeMap((token) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(request);
      })
    );
  }
}
