import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {BASE_TEST_URL} from './Environments/base-test-url';
import { API_BASE_URL } from 'auth-api-elev-onl-exa';
import { provideStore } from '@ngrx/store';
import {tokenReducer} from './Store/Reducers/token.reducer';
import { provideEffects } from '@ngrx/effects';
import {TokenEffect} from './Store/Effects/token.effect';
import {loadingInterceptor} from './Core/Interceptors/loading.interceptor';
import {loadingReducer} from './Store/Reducers/loading.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
        provide: API_BASE_URL,
        useValue: BASE_TEST_URL,
    },
    provideStore({
        token: tokenReducer,
        loading: loadingReducer
    }),
    provideEffects([TokenEffect]),
    provideAnimations(),
  ],
};
