import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import { Config } from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

@Component({
  selector: 'app-end-test',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, RouterLink, MatButtonModule, CommonModule, MatDialogModule, DataTablesModule],
  templateUrl: './end-test.component.html',
  styleUrl: './end-test.component.scss'
})
export class EndTestComponent {
  readonly dialogRef = inject(MatDialogRef<EndTestComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  dataTest: any[] = this.data.testData; // Datos del test

  dtOptions: Config = {
    dom: 'Blfrtip', // Activa los botones
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar a Excel',
        title: `Resultados_Test_${new Date().toLocaleDateString()}`,
      }
     ], // Configuración de botones
  };

  constructor(private router: Router) { 
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/home');
  }
}
