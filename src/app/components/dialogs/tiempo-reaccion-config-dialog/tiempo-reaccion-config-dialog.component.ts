import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TiempoReaccionService } from '../../../services/tiempo-reaccion/tiempo-reaccion.service';
import { Color } from '../../../interfaces/color';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../../../services/color/color.service';
import { MullerLyerService } from '../../../services/muller-lyer/muller-lyer.service';



@Component({
  selector: 'app-tiempo-reaccion-config-dialog',
  imports: [MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatDialogModule, FormsModule],
  templateUrl: './tiempo-reaccion-config-dialog.component.html',
  styleUrl: './tiempo-reaccion-config-dialog.component.scss'
})
export class TiempoReaccionConfigDialogComponent {
  
  dialogRef = inject(MatDialogRef<TiempoReaccionConfigDialogComponent>);
  testService = inject(TiempoReaccionService);
  colorService = inject(ColorService);
  ilusionService = inject(MullerLyerService);

  colors: Color[];
  
  
  stimulusNumber: number = this.testService.getStimulusNumber();
  hiddenStimulusTime: number = this.testService.getHiddenStimulusTime();
  
  stimulusMLNumber: number = this.ilusionService.getStimulusNumber(); // Número de estímulos para la ilusión de Müller-Lyer
  hiddenMLStimulusTime: number = this.ilusionService.getHideLinesTime(); // Tiempo de ocultación de estímulos para la ilusión de Müller-Lyer

  constructor() { 
    this.colors = this.colorService.getColors();
  }

  ngOnInit(): void {
  }

  editColor(color: Color, event: any){
    color.hex = event.target.value;
    this.colorService.editColor(color);
  }

  onHiddenStimulusTimeChange(){
    console.log(this.hiddenStimulusTime);
    this.testService.setHiddenStimulusTime(this.hiddenStimulusTime);
  }
    
  onStimulusNumberChange(){
    console.log(this.stimulusNumber);
    this.testService.setStimulusNumber(this.stimulusNumber);
  }

    /**
   * Actualiza el número de estímulos para la ilusión de Müller-Lyer.
   */
    onStimulusMLNumberChange(): void {
      console.log(`Número de estímulos de Müller-Lyer actualizado a: ${this.stimulusMLNumber}`);
      this.ilusionService.setStimulusNumber(this.stimulusMLNumber);
    }
  
    /**
     * Actualiza el tiempo de ocultación de estímulos para la ilusión de Müller-Lyer.
     */
    onHiddenMLStimulusTimeChange(): void {
      console.log(`Tiempo de ocultación de estímulos de Müller-Lyer actualizado a: ${this.hiddenMLStimulusTime} ms`);
      this.ilusionService.setHideLinesTime(this.hiddenMLStimulusTime);
    }


  
  save(){
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close('Cancel');
  }
}
