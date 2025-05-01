import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { ResetPasswordRequestBody } from '../../shared/models/auth.model';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.css',
})
export class ResetPasswordDialogComponent {
  authService = inject(AuthService);
  router = inject(Router);
  data = inject(MAT_DIALOG_DATA) as { email: string };
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
    this.authService
      .resetPassword(body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error: ', err);
          alert(err.error.errorMessage);
          return of();
        })
      )
      .subscribe(() => {
        alert('Contraseña actualizada. Inicia sesión');
        this.router.navigateByUrl('/login');
        this.dialogRef.close();
      });
  }
}
