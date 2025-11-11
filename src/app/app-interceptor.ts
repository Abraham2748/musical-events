import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './shared/services/auth';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  if (!authService.getIsLoggedIn()) return next(req);

  const currentDate = new Date();

  if (currentDate > authService.getTokenExpiration()) {
    authService.logout(true);
    return EMPTY;
  } else {
    console.log('Token aun no expira :)');
  }

  return next(req);
};

export const handleHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationsService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      notifications.error('Error', error.error.errorMessage);
      console.log('Http error: ', error.error.errorMessage);
      return EMPTY;
    })
  );
};

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    return next(
      req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      })
    );
  }
  return next(req);
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
