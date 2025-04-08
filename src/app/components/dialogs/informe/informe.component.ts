import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Config } from 'datatables.net';
import { EndTestComponent } from '../end-test/end-test.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-informe',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, RouterLink, MatButtonModule, CommonModule, MatDialogModule, DataTablesModule],
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.scss'
})
export class InformeComponent {
  readonly dialogRef = inject(MatDialogRef<EndTestComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  testId: number = this.data.testId; // ID del test
  testTitle: string = this.data.testTitle; // Titulo del test
  testColums: string[] = this.data.testColumns; // Columnas del test


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
