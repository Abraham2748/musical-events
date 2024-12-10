import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  errorInterceptor,
  jwtInterceptor,
  tokenExpiredInterceptor,
} from './app.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        errorInterceptor,
        jwtInterceptor,
        tokenExpiredInterceptor,
      ])
    ),
    importProvidersFrom(SimpleNotificationsModule.forRoot()),
  ],
};
