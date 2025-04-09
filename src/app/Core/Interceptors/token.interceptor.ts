import { HttpInterceptorFn } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {inject} from '@angular/core';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService: CookieService = inject (CookieService);

  const _TOKEN: string = cookieService.get('TOKEN');

  if(req.url.includes('subjects') || req.url.includes('exams')){
    req = req.clone({
      setHeaders: {
        TOKEN: _TOKEN
      }
    });
  }
  return next(req);
};
