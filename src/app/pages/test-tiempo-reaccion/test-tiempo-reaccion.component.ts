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
import { StartTestComponent } from '../../components/dialogs/start-test/start-test.component';
import { InformeService } from '../../services/informe/informe.service';
import { EndTestComponent } from '../../components/dialogs/end-test/end-test.component';
import { ColorService } from '../../services/color/color.service';

@Component({
  selector: 'app-test-tiempo-reaccion',
  imports: [EstimuloComponent, CommonModule],
  templateUrl: './test-tiempo-reaccion.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './test-tiempo-reaccion.component.scss'
})

export class TestTiempoReaccionComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  testService = inject(TiempoReaccionService);
  colorService = inject(ColorService);
  informeService = inject(InformeService);

  COLORES: Color[] = this.colorService.getColors();
  lastPressTime: number | null = null; // Almacena el tiempo de la última pulsación
  hiddenTime: number = this.testService.getHiddenStimulusTime(); // Tiempo en el que el estímulo se oculta
  stimulusData: Object[] = [];
  stimulusColor = this.colorService.getRandomColor();
  stimulusNumber: number = this.testService.getStimulusNumber(); // Número de estímulos a mostrar
  stimulusIsVisible = false;
  testEnded = false; // Indica si la prueba ha terminado
  nextPosition = this.testService.getRandomPosition(); // Posición aleatoria inicial del estímulo
  dialogUp = false; // Indica si el diálogo de inicio se ha mostrado
  stimulusShowed = 0; // Contador de estímulos mostrados


  stimulusStyle = {
    top: '50%', // Posición inicial
    left: '50%', // Posición inicial
    display: 'none' // Ocultar el estímulo al principio
  };
  
  constructor( dialog: MatDialog) { }
  
  
  ngOnInit(): void {
    this.dialogUp = true; // Indica que el diálogo de inicio se ha mostrado
    this.dialog.open(StartTestComponent, {
      data: {name: 'Test de Tiempo de Reacción'}
    }).afterClosed().subscribe(() => {
      this.dialogUp = false; // Indica que el diálogo de inicio se ha cerrado
      this.handleSpaceEvent()
    })
    
  }          

  @HostListener('window:keydown.escape', ['$event'])
  stopTest(event: KeyboardEvent) {
    event.preventDefault(); // Evitar el comportamiento por defecto de la tecla Escape
    this.stimulusIsVisible = false; // Ocultar el estímulo
    this.testEnded = true; // Terminar la prueba
    //console.log('Prueba terminada por el usuario');
    //console.log('Datos de la prueba:', this.stimulusData); // Mostrar los datos de la prueba en la consola
  }

  @HostListener('window:keydown.space', ['$event'])
  handleSpaceEvent(event?: KeyboardEvent) {
    //console.log('Pulsación de tecla registrada');
    
    if (event) event.preventDefault(); // Evitar el comportamiento por defecto de la tecla espacio
    if(this.dialogUp) return; // Si el diálogo de inicio está abierto, no hacer nada
    if(this.testEnded) return; // Si la prueba ha terminado, no hacer nada

    if(!this.stimulusIsVisible && this.lastPressTime !== null) return;

    const currentTime = Date.now(); // Tiempo actual en milisegundos
    if (this.lastPressTime !== null) {
      const reactionTime = currentTime - this.lastPressTime - this.hiddenTime; // Diferencia entre pulsaciones
      this.stimulusData.push({ stimulusNumber: this.stimulusShowed, reactionTime: reactionTime, stimulusColor: this.stimulusColor.hex, stimulusPosition: this.nextPosition.nombre });
      //console.log(`Tiempo de reacción: ${reactionTime} ms`);
    } else {
      //console.log('Primera pulsación registrada.');
    }

    this.lastPressTime = currentTime; // Actualizar el tiempo de la última pulsación
    this.moveStimulus();
  }

  moveStimulus() {

    if(this.stimulusShowed >= this.stimulusNumber) {
      this.endTest(); // Terminar la prueba si se han mostrado todos los estímulosz
      return;
    }

    const container = document.querySelector('.container') as HTMLElement;
    if (container) {


      // Conseguir una posición aleatoria para el estímulo dentro del contenedor desde el servicio
      this.nextPosition = this.testService.getRandomPosition();

      const top = this.nextPosition.y;
      const left = this.nextPosition.x;


      this.stimulusIsVisible = false;
      // Actualizar el estilo del estímulo
      this.stimulusStyle = {
        top: `${top}%`,
        left: `${left}%`,
        display: 'none'
      };

      // Mostrar el estímulo después de un tiempo determinado
      setTimeout(() => {
        this.stimulusStyle = {
          top: `${top}%`,
          left: `${left}%`,
          display: 'block'
        };
        this.stimulusIsVisible = true;
        this.stimulusShowed++; // Incrementar el contador de estímulos mostrados
      }, this.hiddenTime);


      // Cambiar el color del estímulo aleatoriamente
      this.stimulusColor = this.colorService.getRandomColor();

      //console.log('Estímulo movido a:', top, left);
      //console.log('Estímulos mostrados:', this.stimulusShowed, 'de', this.stimulusNumber);
    }
  }
   
  endTest() {
    this.stimulusIsVisible = false; // Ocultar el estímulo
    this.testEnded = true; // Terminar la prueba
    //console.log('Prueba terminada');
    //console.log('Datos de la prueba:', this.stimulusData); // Mostrar los datos de la prueba en la consola
    this.informeService.setTestTiempoReaccionData(this.stimulusData); // Guardar los datos de la prueba en el servicio
    this.dialog.open(EndTestComponent, {
      data: {name: 'Test de Tiempo de Reacción', testData: this.stimulusData, testId: 1},
      width: '1000px',
    })
  }
}
