import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/services/auth.service';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    SimpleHeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  router = inject(Router);

  login() {
    const email = this.loginForm.controls.email.value!;
    const password = this.loginForm.controls.password.value!;

    this.authService
      .login(email, password)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error: ', err);
          alert(err.error.errorMessage);
          return of();
        })
      )
      .subscribe((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('tokenExpiration', res.data.expirationDate);
        this.authService.decodeToken();
        alert('Login exitoso, bienvenido.');
        this.router.navigateByUrl('/');
      });
  }
}
