import { Component, HostListener, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { MatDialog } from '@angular/material/dialog';
import { StartTestComponent } from '../../components/dialogs/start-test/start-test.component';
import { CommonModule } from '@angular/common';
import { TiempoReaccionService } from '../../services/tiempo-reaccion/tiempo-reaccion.service';
import { ColorService } from '../../services/color/color.service';

@Component({
  selector: 'app-test-muller-lyer',
  imports: [BackButtonComponent, CommonModule],
  templateUrl: './test-muller-lyer.component.html',
  styleUrl: './test-muller-lyer.component.scss'
})
export class TestMullerLyerComponent implements OnInit {

  readonly colorService = inject(ColorService);

  line1Length: number = 10; // Longitud inicial de la línea 1 en píxeles
  line2Length: number = 10; // Longitud inicial de la línea 2 en píxeles
  line1Color: string = '#000000'; // Color inicial de las línea 1 y flechas
  line2Color: string = '#000000'; // Color inicial de las línea 2 y flechas

  minLineLength: number = 8; // Longitud mínima de las líneas
  maxLineLength: number = 12; // Longitud máxima de las líneas

  testEnd: boolean = false; // Indica si se ha mostrado el texto final
  hideArrows: boolean = false; // Indica si se deben ocultar las flechas
  hideLinesTime: number = 500; // Tiempo en milisegundos para ocultar las flechas
  stimulusNumber: number = 250; // Número de estímulos
  stimulusDone: number = 0; // Número de estímulos realizados

  testResults: any[] = []; // Array para almacenar los resultados del test

  constructor(private dialog: MatDialog, private testService: TiempoReaccionService) { }



  ngOnInit(): void {
    this.dialog.open(StartTestComponent, {
      data: { name: 'Ilusión de Müller-Lyer' }
    }).afterClosed().subscribe(() => {
      this.startTest();
    })
  }

  setLineLength(line: number, length: number): void {
    if (line === 1) {
      this.line1Length = length;
    } else if (line === 2) {
      this.line2Length = length;
    }
  }

  // Método para cambiar dinámicamente el color de una línea
  setLineColor(lineNumber: number, color: string): void {
    if (lineNumber === 1) {
      this.line1Color = color;
    } else if (lineNumber === 2) {
      this.line2Color = color;
    }
  }

  getRandomLineLength(): number {
    return Math.floor(Math.random() * (this.maxLineLength - this.minLineLength + 1)) + this.minLineLength;
  }

  startTest(): void {
    this.line1Length = this.getRandomLineLength();
    this.hideLines(); // Oculta las flechas al iniciar el test
    this.setLineColor(1, this.colorService.getRandomColor().hex); // Cambia el color de la línea 1
    this.hideArrows = false; // Asegúrate de que las flechas estén visibles al iniciar el test
    this.testEnd = false; // Reinicia el estado del test
  }

  test(linea: number): void {
    if (this.testEnd) return; // Si el test ha terminado, no hacer nada
    let correctAnswer: boolean = false; // Respuesta correcta
    switch (linea) {
      case 1:
        if (this.line1Length > this.line2Length) {
          correctAnswer = true;
        }
        break;

      case 2:
        if (this.line1Length < this.line2Length) {
          correctAnswer = true;
        }
        break;
    }

    this.saveTestResult(linea, correctAnswer); // Guarda el resultado del test
    this.changeLine1Width();
    if (this.isTestEnded()) this.endTest(); // Termina el test si se ha llegado al final

  }

  hideLines(time: number = 500) {
    this.hideArrows = true; // Oculta las flechas
    setTimeout(() => {
      this.hideArrows = false; // Oculta las flechas después de 2 segundos
    }
      , time);
  }

  changeLine1Width() {
    this.hideLines(this.hideLinesTime); // Oculta las flechas después de un tiempo determinado
    this.line1Length = this.getRandomLineLength();
    this.line1Color = this.colorService.getRandomColor().hex; // Cambia el color de la línea 1
    if (this.line1Length === this.line2Length) {
      this.line1Length = this.getRandomLineLength(); // Asegúrate de que las longitudes no sean iguales
    }
  }

  saveTestResult(linea: number, correctAnswer: boolean): void {
    this.testResults.push({
      line1Length: this.line1Length,
      line2Length: this.line2Length,
      line1Color: this.line1Color,
      clickedLine: linea,
      correctAnswer: correctAnswer,
    });
  }

  endTest() {
    this.testEnd = true; // Muestra el texto final
    this.hideArrows = true; // Oculta las flechas
    console.log('Resultados del test:', this.testResults); // Muestra los resultados en la consola
  }

  isTestEnded(): boolean {
    return true; // Devuelve true si el test ha terminado
  }


}
