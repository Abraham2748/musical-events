import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { EventDetail } from './event-detail/event-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'event-detail',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: 'event-detail/:id',
    pathMatch: 'full',
    component: EventDetail,
  },
];
