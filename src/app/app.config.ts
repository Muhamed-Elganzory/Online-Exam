import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {API_BASE_URL} from '../../projects/auth-api/src/lib/token/api-token';
import {BASE_TEST_URL} from './Environments/base-test-url';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
      provide: API_BASE_URL,
      useValue: BASE_TEST_URL
    }
  ],
};
