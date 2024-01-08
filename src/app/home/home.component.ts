import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { EventCardComponent } from './event-card/event-card.component';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    EventCardComponent,
    FooterComponent,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  genreFormControl = new FormControl('');

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getData().subscribe((data) => {
      console.log(data);
    });
  }
}
