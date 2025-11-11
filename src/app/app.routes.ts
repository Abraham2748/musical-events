import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { EventDetail } from './event-detail/event-detail';
import { Customer } from './customer/customer';
import { MyPurchases } from './customer/my-purchases/my-purchases';
import { ChangePassword } from './customer/change-password/change-password';
import { Admin } from './admin/admin';
import { Sales } from './admin/sales/sales';
import { Events } from './admin/events/events';
import { Genres } from './admin/genres/genres';
import { Reports } from './admin/reports/reports';

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
  {
    path: 'customer',
    pathMatch: 'prefix',
    component: Customer,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-purchases',
      },
      {
        path: 'my-purchases',
        component: MyPurchases,
      },
      {
        path: 'change-password',
        component: ChangePassword,
      },
    ],
  },
  {
    path: 'admin',
    pathMatch: 'prefix',
    component: Admin,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sales' },
      {
        path: 'sales',
        component: Sales,
      },
      {
        path: 'events',
        component: Events,
      },
      {
        path: 'genres',
        component: Genres,
      },
      {
        path: 'reports',
        component: Reports,
      },
    ],
  },
];
