import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  firstNamesFormControl = new FormControl('', [Validators.required]);
  lastNamesFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ageFormControl = new FormControl('', [Validators.required]);
  documentTypeFormControl = new FormControl('', [Validators.required]);
  documentNumberFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    this.matchValues(this.passwordFormControl),
  ]);

  docTypes: option[] = [
    { value: '0', viewValue: 'DNI' },
    { value: '1', viewValue: 'CE' },
    { value: '2', viewValue: 'PASAPORTE' },
    { value: '3', viewValue: 'OTROS' },
  ];

  matchValues(matchTo: FormControl) {
    return (control: AbstractControl) => {
      return (control as FormControl).value === matchTo.value
        ? null
        : { mismatch: true };
    };
  }
}
