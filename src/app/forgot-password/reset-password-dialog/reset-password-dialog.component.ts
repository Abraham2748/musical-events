import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { ResetPasswordRequestBody } from '../../shared/models/auth.model';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.css',
})
export class ResetPasswordDialogComponent {
  data = inject(MAT_DIALOG_DATA) as { email: string };
  authService = inject(AuthService);
  router = inject(Router);
  dialogRef = inject(DialogRef);

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

  resetPassword(form: NgForm) {
    const body: ResetPasswordRequestBody = {
      email: this.data.email,
      token: form.controls['token'].value,
      newPassword: form.controls['password'].value,
      confirmNewPassword: form.controls['confirmPassword'].value,
    };
    this.authService.resetPassword(body).subscribe(() => {
      alert('Contraseña actualizada');
      this.router.navigate(['/login']);
      this.dialogRef.close();
    });
  }
}
