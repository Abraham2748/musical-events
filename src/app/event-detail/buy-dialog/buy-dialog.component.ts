import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Concert } from '../../shared/models/concert.model';
import { ConcertsService } from '../../shared/services/concerts.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buy-dialog',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormField, MatInputModule],
  templateUrl: './buy-dialog.component.html',
  styleUrl: './buy-dialog.component.css',
})
export class BuyDialogComponent {
  data = inject(MAT_DIALOG_DATA) as Concert;
  concertsService = inject(ConcertsService);
  matDialogRef = inject(MatDialogRef);

  buyTickets(quantity: number) {
    this.concertsService
      .buyTickets(this.data.id.toString(), quantity)
      .subscribe((response) => {
        this.matDialogRef.close(response.data);
      });
  }
}
