import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { LoggedInHeaderComponent } from '../shared/components/logged-in-header/logged-in-header.component';

@Component({
  selector: 'app-admin',
  imports: [
    LoggedInHeaderComponent,
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
