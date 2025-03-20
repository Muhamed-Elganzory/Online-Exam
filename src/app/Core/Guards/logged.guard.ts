import {CanActivateFn, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {inject} from '@angular/core';

export const loggedGuard: CanActivateFn = (route, state): boolean => {
  const cookieService: CookieService = inject (CookieService);
  const router: Router = inject (Router);

  if (cookieService.get('TOKEN')){
    router.navigate(['/home']);
    return false;
  }
  return true;
};
