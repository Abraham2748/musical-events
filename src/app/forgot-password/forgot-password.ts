import { Component, inject } from '@angular/core';
import { SimpleHeader } from '../shared/components/simple-header/simple-header';
import { Footer } from '../shared/components/footer/footer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../shared/services/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [
    SimpleHeader,
    Footer,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  authService = inject(Auth);
  sendToken(email: string) {
    this.authService.sendTokenToResetPassword(email).subscribe(() => {
      alert('Token Enviado, revisa tu correo');
    });
  }
}
