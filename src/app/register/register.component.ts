import { Component } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
