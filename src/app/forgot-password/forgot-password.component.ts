import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-forgot-password',
  imports: [
    SimpleHeaderComponent,
    FooterComponent,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  matDialog = inject(MatDialog);
  authService = inject(AuthService);
  notifications = inject(NotificationsService);
  sendToken(email: string) {
    this.authService.sendTokenToResetPassword(email).subscribe(() => {
      this.notifications.info('Token Enviado. Revisa tu correo.');
      this.matDialog.open(ResetPasswordDialogComponent, {
        data: { email },
        disableClose: true,
      });
    });
  }
}
