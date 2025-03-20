import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const generalGuard: CanActivateFn = (route, state): boolean => {
  const router: Router = inject (Router);
  const cookieServices: CookieService = inject (CookieService);

  if(cookieServices.get('TOKEN')){
    return true;
  }

  router.navigate(['/signin']);
  return false;
};
