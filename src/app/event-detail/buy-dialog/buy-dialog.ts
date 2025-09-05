import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Concert } from '../../shared/models/concert';
import { ConcertsService } from '../../shared/services/concerts-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-buy-dialog',
  imports: [FormsModule, MatButton, MatFormFieldModule, MatInputModule],
  templateUrl: './buy-dialog.html',
  styleUrl: './buy-dialog.css',
})
export class BuyDialog {
  data = inject(MAT_DIALOG_DATA) as Concert;
  concertsService = inject(ConcertsService);
  matDialogRef = inject(MatDialogRef);

  notifications = inject(NotificationsService);

  buyTickets(quantity: number) {
    this.concertsService
      .buyTickets(this.data.id.toString(), quantity)
      .subscribe((res) => {
        // this.notifications.success('Compra exitosa');
        this.matDialogRef.close(res.data);
      });
  }
}
