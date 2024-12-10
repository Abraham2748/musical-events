import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req.clone();
  const token = localStorage.getItem('token');
  if (token) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
  return next(clonedRequest);
};

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (tokenExpiration) {
    const expirationDate = new Date(tokenExpiration);
    const currentDate = new Date();
    if (currentDate > expirationDate) {
      localStorage.clear();
      alert('Tu sesión ha expirado');
      inject(Router).navigate(['/login']);
      return EMPTY;
    }
  }
  return next(req);
};
