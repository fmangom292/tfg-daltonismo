import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MullerLyerService {

  // Variables para la longitud de las líneas y los colores
  line1Length: number = 10; // Longitud inicial de la línea 1 en píxeles
  line2Length: number = 10; // Longitud inicial de la línea 2 en píxeles

  stimulusNumber: number = 250; // Número de estímulos

  constructor() { }
}
