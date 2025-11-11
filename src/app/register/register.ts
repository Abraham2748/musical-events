import { Component, inject } from '@angular/core';
import { SimpleHeader } from '../shared/components/simple-header/simple-header';
import { Footer } from '../shared/components/footer/footer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../shared/services/auth';
import { RegisterRequestBody } from '../shared/models/auth.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  imports: [
    SimpleHeader,
    Footer,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  authService = inject(Auth);
  router = inject(Router);
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    documentType: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),
  });

  private notifications = inject(NotificationsService);

  register() {
    const body: RegisterRequestBody = {
      age: this.registerForm.controls.age.value!,
      password: this.registerForm.controls.password.value!,
      confirmPassword: this.registerForm.controls.password.value!,
      documentType: this.registerForm.controls.documentType.value!,
      documentNumber: this.registerForm.controls.documentNumber.value!,
      email: this.registerForm.controls.email.value!,
      firstName: this.registerForm.controls.firstName.value!,
      lastName: this.registerForm.controls.lastName.value!,
    };
    this.authService.register(body).subscribe(() => {
      this.notifications.success('Registro exitoso', 'Logueate para continuar');
      this.router.navigateByUrl('/login');
    });
  }
}
