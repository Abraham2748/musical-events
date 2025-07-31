import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './shared/services/auth';
import { catchError, EMPTY, of } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  if (authService.getIsLoggedIn()) {
    const currentDate = new Date();
    if (currentDate > authService.getTokenExpiration()) {
      authService.logout(true);
      return EMPTY;
    }
  }

  return next(req);
};

export const handleHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationsService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      notifications.error('Error', err.error.errorMessage);
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
  } else {
    return next(req);
  }
};
