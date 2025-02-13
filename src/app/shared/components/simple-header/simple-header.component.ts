import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simple-header',
  imports: [RouterLink],
  templateUrl: './simple-header.component.html',
  styleUrl: './simple-header.component.css',
})
export class SimpleHeaderComponent {}
