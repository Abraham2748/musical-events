import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../shared/services/auth';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { ResetPasswordRequestBody } from '../../shared/models/auth.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './reset-password-dialog.html',
  styleUrl: './reset-password-dialog.css',
})
export class ResetPasswordDialog {
  authService = inject(Auth);
  router = inject(Router);
  data = inject(MAT_DIALOG_DATA) as { email: string };
  dialogRef = inject(DialogRef);
  private notifications = inject(NotificationsService);

  resetPassword(form: NgForm) {
    const body: ResetPasswordRequestBody = {
      email: this.data.email,
      token: form.controls['token'].value,
      newPassword: form.controls['password'].value,
      confirmNewPassword: form.controls['confirmPassword'].value,
    };

    this.authService.resetPassword(body).subscribe(() => {
      this.notifications.success('Contraseña actualizada');
      this.router.navigateByUrl('/login');
      this.dialogRef.close();
    });
  }

  verifyPasswords(form: NgForm) {
    const password = form.controls['password'];
    const confirmPassword = form.controls['confirmPassword'];

    if (
      password &&
      confirmPassword &&
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value
    ) {
      confirmPassword.setErrors(null);
    } else {
      confirmPassword.setErrors({ mismatch: true });
    }
  }
}
