import { Component, inject } from '@angular/core';
import { SimpleHeader } from '../shared/components/simple-header/simple-header';
import { Footer } from '../shared/components/footer/footer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../shared/services/auth';
import { MatDialog } from '@angular/material/dialog';

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
  matDialog = inject(MatDialog);

  sendToken(email: string) {
    this.authService.sendTokenToResetPassword(email).subscribe(() => {
      alert('Token enviado, revisa tu correo');
      // open reset password dialog
    });
  }
}
