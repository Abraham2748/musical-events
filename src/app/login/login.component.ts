import { Component } from '@angular/core';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  imports: [SimpleHeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
