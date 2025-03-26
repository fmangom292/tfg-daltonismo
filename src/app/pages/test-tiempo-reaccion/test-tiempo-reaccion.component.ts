import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { EstimuloComponent } from "../../components/estimulo/estimulo.component";
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TiempoReaccionService } from '../../services/tiempo-reaccion/tiempo-reaccion.service';
import { Color } from '../../interfaces/color';


@Component({
  selector: 'app-test-tiempo-reaccion',
  imports: [BackButtonComponent, EstimuloComponent, CommonModule],
  templateUrl: './test-tiempo-reaccion.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './test-tiempo-reaccion.component.scss'
})
export class TestTiempoReaccionComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  testService = inject(TiempoReaccionService);

  COLORES: Color[] = this.testService.getColors();
  lastPressTime: number | null = null; // Almacena el tiempo de la última pulsación
  hiddenTime: number = 2500; // Tiempo en el que el estímulo se oculta
  stimulusData: Object[] = [];
  stimulusColor = this.testService.getRandomColor();

  stimulusIsVisible = false;

  stimulusStyle = {
    top: '50%', // Posición inicial
    left: '50%', // Posición inicial
    display: 'none' // Ocultar el estímulo al principio
  };
  
  constructor( dialog: MatDialog) { }
  
  
  ngOnInit(): void {
  }


  @HostListener('window:keydown.space', ['$event'])
  handleSpaceEvent(event: KeyboardEvent) {
    event.preventDefault();

    if(!this.stimulusIsVisible && this.lastPressTime !== null) return;

    const currentTime = Date.now(); // Tiempo actual en milisegundos
    if (this.lastPressTime !== null) {
      const reactionTime = currentTime - this.lastPressTime - this.hiddenTime; // Diferencia entre pulsaciones
      console.log(`Tiempo de reacción: ${reactionTime} ms`);
    } else {
      console.log('Primera pulsación registrada.');
    }

    this.lastPressTime = currentTime; // Actualizar el tiempo de la última pulsación
    this.moveStimulus();
  }

  moveStimulus() {
    const container = document.querySelector('.container') as HTMLElement;
    if (container) {

      // Conseguir una posición aleatoria para el estímulo dentro del contenedor desde el servicio

      const position = this.testService.getRandomPosition();

      const top = position.y;
      const left = position.x;


      // Actualizar el estilo del estímulo
      this.stimulusStyle = {
        top: `${top}%`,
        left: `${left}%`,
        display: 'none'
      };
      this.stimulusIsVisible = false;

      // Mostrar el estímulo después de un tiempo determinado
      setTimeout(() => {
        this.stimulusStyle = {
          top: `${top}%`,
          left: `${left}%`,
          display: 'block'
        };
        this.stimulusIsVisible = true;
      }, this.hiddenTime); 


      // Cambiar el color del estímulo aleatoriamente
      this.stimulusColor = this.testService.getRandomColor();

      console.log('Estímulo movido a:', top, left);
    }
  }
}
