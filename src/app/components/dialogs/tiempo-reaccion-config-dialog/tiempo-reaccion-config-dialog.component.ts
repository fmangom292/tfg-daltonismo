import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TiempoReaccionService } from '../../../services/tiempo-reaccion/tiempo-reaccion.service';
import { Color } from '../../../interfaces/color';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../../../services/color/color.service';
import { MullerLyerService } from '../../../services/muller-lyer/muller-lyer.service';
import { LineasVhService } from '../../../services/lineas-vh/lineas-vh.service';



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
  vhService = inject(LineasVhService)

  colors: Color[];
  backgroundColor: Color = this.colorService.getBackgroundColor(); // Color de fondo del contenedor

  stimulusNumber: number = this.testService.getStimulusNumber();
  hiddenStimulusTime: number = this.testService.getHiddenStimulusTime();
  timeToClick: number = this.testService.getTimeToClick(); // Tiempo para hacer clic después de que el estímulo se muestre

  stimulusMLNumber: number = this.ilusionService.getStimulusNumber(); // Número de estímulos para la ilusión de Müller-Lyer
  hiddenMLStimulusTime: number = this.ilusionService.getHideLinesTime(); // Tiempo de ocultación de estímulos para la ilusión de Müller-Lyer

  stimulusVHNumber: number = this.vhService.getStimulusNumber(); // Número de estímulos para la ilusión de líneas verticales y horizontales
  hiddenVHStimulusTime: number = this.vhService.getHideTime(); // Tiempo de ocultación de estímulos para la ilusión de líneas verticales y horizontales

  constructor() {
    this.colors = this.colorService.getColors();
  }

  ngOnInit(): void {
  }

  editColor(color: Color, event: any) {
    color.hex = event.target.value;
    this.colorService.editColor(color);
  }

  onHiddenStimulusTimeChange() {
    //console.log(this.hiddenStimulusTime);
    this.testService.setHiddenStimulusTime(this.hiddenStimulusTime);
  }

  onStimulusNumberChange() {
    //console.log(this.stimulusNumber);
    this.testService.setStimulusNumber(this.stimulusNumber);
  }

  onTimeToClickChange() {
    //console.log(this.stimulusNumber);
    this.testService.setTimeToClick(this.timeToClick);
  }

  onBackgroundColorChange() {
    this.colorService.setBackgroundColor(this.backgroundColor);
  }

  /**
 * Actualiza el número de estímulos para la ilusión de Müller-Lyer.
 */
  onStimulusMLNumberChange(): void {
    //console.log(`Número de estímulos de Müller-Lyer actualizado a: ${this.stimulusMLNumber}`);
    this.ilusionService.setStimulusNumber(this.stimulusMLNumber);
  }

  /**
   * Actualiza el tiempo de ocultación de estímulos para la ilusión de Müller-Lyer.
   */
  onHiddenMLStimulusTimeChange(): void {
    //console.log(`Tiempo de ocultación de estímulos de Müller-Lyer actualizado a: ${this.hiddenMLStimulusTime} ms`);
    this.ilusionService.setHideLinesTime(this.hiddenMLStimulusTime);
  }

  /**
   * Actualiza el número de estímulos para la ilusión de líneas VH.
   */
  onStimulusVHNumberChange(): void {
    console.log(`Número de estímulos de líneas VH actualizado a: ${this.stimulusVHNumber}`);
    this.vhService.setStimulusNumber(this.stimulusVHNumber);
  }

  /**
   * Actualiza el tiempo de ocultación de estímulos para la ilusión de líneas VH.
   */
  onHiddenVHStimulusTimeChange(): void {
    console.log(`Tiempo de ocultación de estímulos de líneas VH actualizado a: ${this.hiddenVHStimulusTime} ms`);
    this.vhService.setHideTime(this.hiddenVHStimulusTime);
  }


  save() {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close('Cancel');
  }
}
