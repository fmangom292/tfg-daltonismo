import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { TiempoReaccionConfigDialogComponent } from '../../components/dialogs/tiempo-reaccion-config-dialog/tiempo-reaccion-config-dialog.component';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  openTiempoReaccionConfigDialog() {
    this.dialog.open(TiempoReaccionConfigDialogComponent);
  }
}
