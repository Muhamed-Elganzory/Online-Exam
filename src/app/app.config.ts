import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {DEV_URL} from './Environments/development';
import { API_BASE_URL } from 'auth-api-elev-onl-exa';
import { provideStore } from '@ngrx/store';
import {tokenReducer} from './Store/Reducers/token.reducer';
import { provideEffects } from '@ngrx/effects';
import {TokenEffect} from './Store/Effects/token.effect';
import {loadingInterceptor} from './Core/Interceptors/loading.interceptor';
import {loadingReducer} from './Store/Reducers/loading.reducer';
import {tokenInterceptor} from './Core/Interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, tokenInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
        provide: API_BASE_URL,
        useValue: DEV_URL,
    },
    provideStore({
        token: tokenReducer,
        loading: loadingReducer
    }),
    provideEffects([TokenEffect]),
    provideAnimations(),
  ],
};
