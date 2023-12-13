import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageKeys, LocalStorageUtils } from '@libs/ng/utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = LocalStorageUtils.getItem(LocalStorageKeys.ACCESS_TOKEN);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
