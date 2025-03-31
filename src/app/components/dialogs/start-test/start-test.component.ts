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
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-start-test',
  imports: [MatDialogModule , CommonModule, MatDialogContent,  FormsModule, MatButtonModule],
  templateUrl: './start-test.component.html',
  styleUrl: './start-test.component.scss'
})
export class StartTestComponent {
  readonly dialogRef = inject(MatDialogRef<StartTestComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
