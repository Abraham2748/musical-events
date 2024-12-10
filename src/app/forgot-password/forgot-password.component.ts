import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    SimpleHeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FooterComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  notifications = inject(NotificationsService);

  sendToken(email: string) {
    this.authService.sendToken(email).subscribe(() => {
      this.notifications.info('Token enviado', 'Revisa tu correo');
      this.matDialog.open(ResetPasswordDialogComponent, {
        data: { email },
        disableClose: true,
      });
    });
  }
}
