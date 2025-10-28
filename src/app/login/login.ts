import { Component } from '@angular/core';
import { SimpleHeader } from '../shared/components/simple-header/simple-header';
import { Footer } from '../shared/components/footer/footer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [SimpleHeader, Footer, MatFormFieldModule, MatInputModule, RouterLink, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
