import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  handleHttpErrorInterceptor,
  jwtInterceptor,
  loadingScreenInterceptor,
  tokenExpiredInterceptor,
} from './app-interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        tokenExpiredInterceptor,
        handleHttpErrorInterceptor,
        jwtInterceptor,
        loadingScreenInterceptor,
      ])
    ),
    importProvidersFrom(SimpleNotificationsModule.forRoot(), NgxSpinnerModule),
    provideAnimationsAsync(),
  ],
};
