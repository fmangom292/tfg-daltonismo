import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../../services/color/color.service';
import { Color } from '../../interfaces/color';
import { TiempoReaccionService } from '../../services/tiempo-reaccion/tiempo-reaccion.service';
import { LineasVhService } from '../../services/lineas-vh/lineas-vh.service';
import { InformeService } from '../../services/informe/informe.service';
import { MatDialog } from '@angular/material/dialog';
import { StartTestComponent } from '../../components/dialogs/start-test/start-test.component';
import { EndTestComponent } from '../../components/dialogs/end-test/end-test.component';

@Component({
  selector: 'app-test-lineas-vh',
  imports: [CommonModule, FormsModule],
  templateUrl: './test-lineas-vh.component.html',
  styleUrl: './test-lineas-vh.component.scss'
})
export class TestLineasVHComponent implements OnInit {

  colorService = inject(ColorService)
  configService = inject(LineasVhService)
  informeService = inject(InformeService)
  testData: any[] = []; // Datos de prueba

  backgroundColor: Color = this.colorService.getBackgroundColor(); // Color de fondo inicial

  
  verticalLineLength: number = 80; // Longitud inicial de la línea vertical en mm
  horizontalLineLength: number = 100; // Longitud inicial de la línea horizontal en mm
  verticalLineColor: Color = this.colorService.getRandomColor(); // Color inicial de la línea vertical
  lineSpacing: number = 5; // Espaciado inicial entre las líneas en mm
  
  hideStimulus: boolean = false; // Bandera para ocultar el estímulo
  hideTime: number = this.configService.getHideTime(); // Tiempo de ocultación en milisegundos
  stimulusNumber: number = this.configService.getStimulusNumber(); // Número de estímulos 
  stimulusDone: number = 0; // Número de estímulos realizados 

  endTestFlag: boolean = false; // Bandera para indicar si la prueba ha terminado
  constructor(private dialog: MatDialog,) { }
  
  
  ngOnInit(): void {
    this.dialog.open(StartTestComponent, {
      data: { name: 'Ilusión de líneas verticales y horizontales' }
    }).afterClosed().subscribe(() => {
      this.startTest(); // Inicia la prueba al cerrar el diálogo
    })
  }

  startTest() {
    this.cambiarLineas(); // Cambia la longitud de las líneas y el espaciado
  }

  cambiarLineas(){
    this.hideStimulus = true; // Oculta el estímulo
    setTimeout(() => {
      this.hideStimulus = false; // Muestra el estímulo
    }
    , this.hideTime); // Espera el tiempo de ocultación
    this.verticalLineLength = this.getRandomInt(80, 120); // Longitud aleatoria entre 50 y 150 mm
    this.verticalLineColor = this.colorService.getRandomColor(); // Color aleatorio de la línea vertical
    this.lineSpacing = this.getRandomInt(5, 40); // Espaciado aleatorio entre 5 y 25 mm
  }

  test(line: number){

    if(this.endTestFlag){
      return; // Si la prueba ha terminado, no hace nada
    } 
      

    const correctAnswer = this.verticalLineLength > this.horizontalLineLength ? 1 : 2; // Respuesta correcta
    const answerData = {stimulusNumber: this.stimulusDone+1, clickedLine: line, verticalLineLength: this.verticalLineLength, correctAnswer: correctAnswer == line, verticalLineColor: this.verticalLineColor, lineSpacing: this.lineSpacing }
    this.testData.push(answerData); // Agrega el número de línea al array de datos de prueba
    
    console.log('Answer data', answerData); // Muestra los datos de prueba en la consola
    
    this.cambiarLineas(); // Cambia la longitud de las líneas y el espaciado
    this.stimulusDone++; // Incrementa el número de estímulos realizados

    if(this.isTestDone()){
      this.endTestFlag = true; // Si se han realizado todos los estímulos, establece la bandera de finalización de la prueba
      this.endTest(); // Llama al método para finalizar la prueba
      console.log('Test done', this.testData); // Muestra los datos de prueba en la consola
    }
  }

  isTestDone() {
    return this.stimulusDone >= this.stimulusNumber; // Verifica si se han realizado todos los estímulos
  }

  endTest() {
    this.informeService.setTestLineasVHData(this.testData); // Establece los datos de prueba en el servicio de informe
    this.dialog.open(EndTestComponent, {
      data: {
        testId: 3, // ID del test
        testTitle: 'Ilusión de Líneas Vertical - Horizontal', // Título del test
        testData: this.testData, // Datos del test
      },
      maxWidth: '90vw',
      height: 'auto',
    }).afterClosed().subscribe(() => {
      this.informeService.setTestLineasVHData(this.testData); // Guarda los resultados en el servicio de informe
    });

  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
