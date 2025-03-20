import { HttpInterceptorFn } from '@angular/common/http';
import {finalize} from 'rxjs';
import {LoadingService} from './Service/loading.service';
import {inject} from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService: LoadingService = inject (LoadingService);

  loadingService.show(true);
  return next(req).pipe(finalize((): void => {
    loadingService.hide(false);
  }));
};
