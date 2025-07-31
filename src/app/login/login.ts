import { Component, inject } from '@angular/core';
import { SimpleHeader } from '../shared/components/simple-header/simple-header';
import { Footer } from '../shared/components/footer/footer';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../shared/services/auth';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  imports: [
    SimpleHeader,
    Footer,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(Auth);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  router = inject(Router);

  notifications = inject(NotificationsService);

  login() {
    const email = this.loginForm.controls.email.value!;
    const password = this.loginForm.controls.password.value!;

    this.authService.login(email, password).subscribe((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('tokenExpiration', res.data.expirationDate);
      this.authService.decodeToken();
      this.notifications.success('Login exitoso', 'Bienvenido.');
      this.router.navigateByUrl('/');
    });
  }
}
