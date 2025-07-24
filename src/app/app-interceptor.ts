import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './shared/services/auth';
import { catchError, EMPTY, of } from 'rxjs';

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
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      alert(err.error.errorMessage);
      console.error('Error HTTP capturado: ', err);
      return EMPTY;
    })
  );
};
