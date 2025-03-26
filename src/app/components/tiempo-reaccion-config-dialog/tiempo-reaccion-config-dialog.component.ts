import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TiempoReaccionService } from '../../services/tiempo-reaccion/tiempo-reaccion.service';
import { Color } from '../../interfaces/color';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-tiempo-reaccion-config-dialog',
  imports: [MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatDialogModule, FormsModule],
  templateUrl: './tiempo-reaccion-config-dialog.component.html',
  styleUrl: './tiempo-reaccion-config-dialog.component.scss'
})
export class TiempoReaccionConfigDialogComponent {
  
  dialogRef = inject(MatDialogRef<TiempoReaccionConfigDialogComponent>);
  testService = inject(TiempoReaccionService);
  colors: Color[];
  
  constructor() { 
    this.colors = this.testService.getColors();
  }

  ngOnInit(): void {
  }

  editColor(color: Color, event: any){
    color.hex = event.target.value;
    this.testService.editColor(color);
  }
    
  save(){
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close('Cancel');
  }
}
