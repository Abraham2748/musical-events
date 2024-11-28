import { Component } from '@angular/core';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SimpleHeaderComponent,
    FooterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
