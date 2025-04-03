import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { TiempoReaccionConfigDialogComponent } from '../../components/dialogs/tiempo-reaccion-config-dialog/tiempo-reaccion-config-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  openTiempoReaccionConfigDialog() {
    this.dialog.open(TiempoReaccionConfigDialogComponent, {
      height: '60vh',
    });
  }
}
