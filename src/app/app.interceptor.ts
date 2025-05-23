import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { catchError, delay, EMPTY, finalize, of } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.getIsLoggedIn()) {
    const currentDate = new Date();
    if (currentDate > authService.getTokenExpiration()) {
      authService.logout(true);
      return EMPTY;
    }
  }

  return next(req);
};

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;

  const token = localStorage.getItem('token');
  if (token) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  return next(clonedRequest);
};

export const handleHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationsService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      notifications.error('Error', err.error.errorMessage);
      return of();
    })
  );
};

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  return next(req).pipe(
    finalize(() => {
      spinner.hide();
    })
  );
};
