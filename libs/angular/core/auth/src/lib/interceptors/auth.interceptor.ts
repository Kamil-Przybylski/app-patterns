import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorage } from '@libs/ng/shared/local-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = LocalStorage.getItem('accessToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
