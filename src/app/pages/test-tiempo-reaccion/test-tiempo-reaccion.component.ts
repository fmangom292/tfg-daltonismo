import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { EstimuloComponent } from "../../components/estimulo/estimulo.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-test-tiempo-reaccion',
  imports: [BackButtonComponent, EstimuloComponent, CommonModule],
  templateUrl: './test-tiempo-reaccion.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './test-tiempo-reaccion.component.scss'
})
export class TestTiempoReaccionComponent {

  COLORES: string[] = ['grey', 'red', 'green', 'blue', 'yellow', 'pink']
  lastPressTime: number | null = null; // Almacena el tiempo de la última pulsación
  hiddenTime: number = 2500; // Tiempo en el que el estímulo se oculta


  @HostListener('window:keydown.space', ['$event'])
  handleEnterEvent(event: KeyboardEvent) {
    event.preventDefault();
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

  constructor() { }

  stimulusStyle = {
    top: '50%', // Posición inicial
    left: '50%', // Posición inicial
    display: 'none' // Ocultar el estímulo al principio
  };

  stimulusColor = 'black';

  moveStimulus() {
    const container = document.querySelector('.container') as HTMLElement;
    if (container) {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const stimulusSize = 50; // Tamaño del estímulo (ajusta según sea necesario)

      // Generar posiciones aleatorias dentro del contenedor, respetando los bordes
      const randomTop = Math.random() * (containerHeight - stimulusSize);
      const randomLeft = Math.random() * (containerWidth - stimulusSize);

      // Asegurarse de que las posiciones sean válidas y no excedan los límites
      const top = Math.max(0, Math.min(randomTop, containerHeight - stimulusSize));
      const left = Math.max(0, Math.min(randomLeft, containerWidth - stimulusSize));

      // Actualizar el estilo del estímulo
      this.stimulusStyle = {
        top: `${top}px`,
        left: `${left}px`,
        display: 'none'
      };

      
      setTimeout(() => {
        this.stimulusStyle = {
          top: `${top}px`,
          left: `${left}px`,
          display: 'block'
        };
      }, this.hiddenTime); // Ocultar el estímulo después de 1 segundo


      // Cambiar el color del estímulo aleatoriamente
      this.stimulusColor = this.COLORES[Math.floor(Math.random() * this.COLORES.length)];

      console.log('Estímulo movido a:', top, left);
    }
  }
}
