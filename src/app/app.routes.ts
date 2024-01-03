import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    // loadComponent: () =>
    //   import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];
