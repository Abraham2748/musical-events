import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './shared/services/auth';
import { catchError, EMPTY } from 'rxjs';

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
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      alert('Error: ' + error.error.errorMessage);
      console.log('Http error: ', error.error.errorMessage);
      return EMPTY;
    })
  );
};
