import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { TiempoReaccionConfigDialogComponent } from '../../components/dialogs/tiempo-reaccion-config-dialog/tiempo-reaccion-config-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { InformeComponent } from '../../components/dialogs/informe/informe.component';
import { TiempoReaccionService } from '../../services/tiempo-reaccion/tiempo-reaccion.service';
import { MullerLyerService } from '../../services/muller-lyer/muller-lyer.service';
import { InformeService } from '../../services/informe/informe.service';



@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {

  readonly tiempoReaccionService = inject(TiempoReaccionService)
  readonly mullerLyerService = inject(MullerLyerService)
  readonly lineasVHService = inject(MullerLyerService)
  readonly informeService = inject(InformeService)


  constructor(private dialog: MatDialog) { }

  openTiempoReaccionConfigDialog() {
    this.dialog.open(TiempoReaccionConfigDialogComponent, {
      height: '60vh',
    });
  }

  openInformeDialog() {
    this.dialog.open(InformeComponent, {
      data:{
        tiempoReaccionData: this.informeService.getTestTiempoReaccionData(),
        mullerLyerData: this.informeService.getTestMullerLyerData(),
        lineasVHData: this.informeService.getTestLineasVHData(),
      },
      maxWidth: '90vw',
      height: 'auto'
    })
  }
}
