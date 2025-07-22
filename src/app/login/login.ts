import { Component } from '@angular/core';
import { SimpleHeader } from '../shared/components/simple-header/simple-header';

@Component({
  selector: 'app-login',
  imports: [SimpleHeader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
