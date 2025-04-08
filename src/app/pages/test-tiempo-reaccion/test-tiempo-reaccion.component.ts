import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
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
import { Position } from '../../interfaces/position';

@Component({
  selector: 'app-test-tiempo-reaccion',
  imports: [EstimuloComponent, CommonModule],
  templateUrl: './test-tiempo-reaccion.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './test-tiempo-reaccion.component.scss'
})

export class TestTiempoReaccionComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  testService = inject(TiempoReaccionService);
  colorService = inject(ColorService);
  informeService = inject(InformeService);

  COLORES: Color[] = this.colorService.getColors();
  
  stimulusShowTime: number | null = null; // Almacena el tiempo al mostrar el estímulo
  hiddenTime: number = this.testService.getHiddenStimulusTime(); // Tiempo en el que el estímulo se oculta
  
  testData: Object[] = [];
  
  stimulusColor = this.colorService.getRandomColor();
  stimulusNumber: number = this.testService.getStimulusNumber(); // Número de estímulos a mostrar
  nextPosition: Position = this.testService.getRandomPosition(); // Posición aleatoria inicial del estímulo
  stimulusIsVisible: boolean = true;
  stimulusPressed: number = 0; // Contador de estímulos presionados

  testEnded: boolean = false; // Indica si la prueba ha terminado
  dialogUp: boolean = false; // Indica si el diálogo de inicio se ha mostrado

  timeToClick: number = this.testService.getTimeToClick(); // Tiempo para hacer clic después de que el estímulo se muestre
  timeoutRef: any; // ID del timeout para el clic

  backgroundColor: Color = this.colorService.getBackgroundColor(); // Color de fondo del contenedor

  combinations: { color: Color; position: Position }[] = [];
  currentCombinationIndex: number = 0; // Índice de la combinación actual

  stimulusStyle = {
    top: '50%', // Posición inicial
    left: '50%', // Posición inicial
    display: 'none' // Ocultar el estímulo al principio
  };

  constructor(dialog: MatDialog) { }
  ngOnDestroy(): void {
    this.endTest(); // Terminar la prueba al destruir el componente
  }


  ngOnInit(): void {
    this.dialogUp = true; // Indica que el diálogo de inicio se ha mostrado
    this.dialog.open(StartTestComponent, {
      data: { name: 'Test de Tiempo de Reacción' }
    }).afterClosed().subscribe(( result ) => {
      if (result) this.startTest(); // Iniciar la prueba si el usuario acepta
      this.dialogUp = false; // Indica que el diálogo de inicio se ha cerrado  
    })

  }

  @HostListener('window:keydown.escape', ['$event'])
  stopTest(event: KeyboardEvent) {
    event.preventDefault(); // Evitar el comportamiento por defecto de la tecla Escape
    this.stimulusIsVisible = false; // Ocultar el estímulo
    this.testEnded = true; // Terminar la prueba
    //console.log('Prueba terminada por el usuario');
    //console.log('Datos de la prueba:', this.testData); // Mostrar los datos de la prueba en la consola
  }

  @HostListener('window:keydown.space', ['$event'])
  handleSpaceEvent(event?: KeyboardEvent) {
    this.test(); // Llamar a la función de prueba al presionar la barra espaciadora
  }


  startTest(){
    this.stimulusIsVisible = false; // Ocultar el estímulo
    this.testEnded = false; // Reiniciar el estado de la prueba
    this.testData = []; // Reiniciar los datos de la prueba

    // Generar combinaciones de colores y posiciones
    this.generateCombinations(2); // Número de repeticiones

    this.showStimulus(); // Mostrar el estímulo por primera vez
  }
  
  test(noClicked: boolean = false) {
    if (this.testEnded || !this.stimulusIsVisible) return;
    clearTimeout(this.timeoutRef); // Limpiar el timeout anterior si existe
  

    if(noClicked) this.stimulusShowTime = Date.now() - 80000; // Si no se hizo clic, establecer un tiempo de reacción negativo

    this.saveTestData(); // Guardar los datos de la prueba antes de continuar
    
    this.stimulusPressed++; // Incrementar el contador de estímulos presionados
    this.setStimulusStyles(); // Establecer los estilos del estímulo (posición y color)
    
    this.showStimulus(); // Llamar a la función para mostrar el estímulo después de un tiempo
  }

  showStimulus() {
    const hideTime = this.getRandomNumber(this.hiddenTime - 500, this.hiddenTime + 500 ); // Tiempo aleatorio para ocultar el estímulo
    console.log('Mostrando estímulo después de ', hideTime, 'ms'); // Mostrar el tiempo de espera en la consola
    this.stimulusIsVisible = false; // Asegurarse de que el estímulo esté oculto al principio
    
    
    setTimeout(() => {
      this.stimulusIsVisible = true; // Mostrar el estímulo
      this.stimulusShowTime = Date.now(); // Guardar el tiempo cuando aparece
      this.stimulusStyle = {
        top: `${this.nextPosition.y}%`, 
        left: `${this.nextPosition.x}%`,
        display: 'block'
      }

      this.timeoutRef = setTimeout(() => {
        this.stimulusShowTime = null; // Reiniciar el tiempo de aparición
        this.test(); // Llamar a la función test para continuar con la prueba
      }, this.timeToClick); // Tiempo para hacer clic después de que el estímulo se muestre
    }, hideTime);// Esperar el tiempo definido para ocultar el estímulo

  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Selecciona la siguiente combinación de la lista y la aplica al estímulo.
   */
  setStimulusStyles() {
    if (this.currentCombinationIndex >= this.combinations.length) {
      this.testEnded = true; // Terminar la prueba si se han usado todas las combinaciones
      this.endTest();
      return;
    }
  
    const combination = this.combinations[this.currentCombinationIndex];
    this.stimulusColor = combination.color; // Establecer el color del estímulo
    this.nextPosition = combination.position; // Establecer la posición del estímulo
  
    this.stimulusStyle = {
      top: `${this.nextPosition.y}%`,
      left: `${this.nextPosition.x}%`,
      display: 'none',
    };
    this.stimulusIsVisible = false; // Asegurarse de que el estímulo esté oculto al principio
  
    this.currentCombinationIndex++; // Avanzar al siguiente estímulo
  }

  saveTestData() {
    console.log('Guardando datos de la prueba...');
    
    const testResult = {
      stimulusColor: this.stimulusColor,
      stimulusPosition: this.nextPosition,
      stimulusNumber: this.stimulusPressed +1,
      reactionTime: this.stimulusShowTime ? Date.now() - this.stimulusShowTime : -1, // Calcular el tiempo de reacción
    };
    this.testData.push(testResult); // Guardar los resultados de la prueba en el array

    this.stimulusShowTime = Date.now(); // Actualizar el tiempo de la última pulsación
    console.log('testData', this.testData); // Mostrar los datos de la prueba en la consola
    
  }

  endTest(){
    this.stimulusIsVisible = false; // Ocultar el estímulo
    this.testEnded = true; // Terminar la prueba
    this.informeService.setTestTiempoReaccionData(this.testData); // Guardar los datos de la prueba
  }

  showEndTestDialog() {
    this.dialog.open(EndTestComponent, {
      data: { 
        name: 'Test de Tiempo de Reacción',
        testId: 1,
        testData: this.testData,
       }
    }).afterClosed().subscribe(() => {
      this.testData = []; // Reiniciar los datos de la prueba
    })
  }

  /**
   * Genera combinaciones de colores y posiciones, asegurando que cada color pase por cada posición un número específico de veces.
   * @param repetitions Número de veces que cada color debe pasar por cada posición.
   */
  generateCombinations(repetitions: number) {
    const colors = this.colorService.getColors(); // Obtener todos los colores
    const positions = this.testService.getPositions(); // Obtener todas las posiciones posibles
  
    this.combinations = [];
  
    // Generar combinaciones controladas
    for (const color of colors) {
      for (const position of positions) {
        for (let i = 0; i < repetitions; i++) {
          this.combinations.push({ color, position });
        }
      }
    }
  
    // Mezclar las combinaciones para que el orden sea aleatorio
    this.combinations = this.shuffleArray(this.combinations);
  
    this.currentCombinationIndex = 0; // Reiniciar el índice
    console.log('Combinaciones generadas:', this.combinations);
  }
  
  /**
   * Mezcla un array de manera aleatoria.
   * @param array Array a mezclar.
   * @returns Array mezclado.
   */
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

}
