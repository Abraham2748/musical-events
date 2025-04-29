import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
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

  login() {
    this.authService
      .login('admin@gmail.com', 'Admin1234*')
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error: ', err);
          alert(err.error.errorMessage);
          return of();
        })
      )
      .subscribe((res) => {
        console.log('!!!');
        console.log(res);
      });
  }
}
