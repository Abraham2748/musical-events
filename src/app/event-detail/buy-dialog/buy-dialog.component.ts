import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Concert } from '../../shared/models/concert.model';
import { ConcertsService } from '../../shared/services/concerts.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy-dialog',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
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
      .subscribe((res) => {
        this.matDialogRef.close(res.data);
      });
  }
}
