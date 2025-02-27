import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { MyPurchasesComponent } from './customer/my-purchases/my-purchases.component';
import { ChangePasswordComponent } from './customer/change-password/change-password.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'event-detail',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: 'event-detail/:id',
    pathMatch: 'full',
    component: EventDetailComponent,
  },
  {
    path: 'customer',
    pathMatch: 'prefix',
    component: CustomerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-purchases',
      },
      {
        path: 'my-purchases',
        component: MyPurchasesComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
];
