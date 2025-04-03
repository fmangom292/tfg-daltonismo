import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
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
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, RouterLink, MatButtonModule, CommonModule, MatDialogModule, DataTablesModule, MatDialogContainer],
  templateUrl: './end-test.component.html',
  styleUrl: './end-test.component.scss'
})
export class EndTestComponent {
  readonly dialogRef = inject(MatDialogRef<EndTestComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  testId: number = this.data.testId; // ID del test
  testTitle: string = this.data.testTitle; // Titulo del test
  testColums: string[] = this.data.testColumns; // Columnas del test
  testData: any[] = this.data.testData; // Datos del test


  dtOptions: Config = {
    dom: 'Blfrtip', // Activa los botones,
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json', // Idioma español
    },
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
