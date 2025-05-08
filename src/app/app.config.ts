import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  handleHttpErrorInterceptor,
  jwtInterceptor,
  tokenExpiredInterceptor,
} from './app.interceptor';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        tokenExpiredInterceptor,
        jwtInterceptor,
        handleHttpErrorInterceptor,
      ])
    ),
    provideAnimationsAsync(),
    importProvidersFrom(SimpleNotificationsModule.forRoot()),
  ],
};
