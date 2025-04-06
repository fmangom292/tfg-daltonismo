import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LineasVhService {

  private verticalLineLength: number = 80; // Longitud inicial de la línea vertical en mm
  private horizontalLineLength: number = 100; // Longitud inicial de la línea horizontal en mm
  private stimulusNumber: number = 5; // Número de estímulos
  private hideTime: number = 500; // Tiempo de ocultación en milisegundos

  constructor() { }

  /**
   * Obtiene la longitud de la línea vertical.
   * @returns {number} Longitud de la línea vertical en mm.
   */
  getVerticalLineLength(): number {
    return this.verticalLineLength;
  }

  /**
   * Establece la longitud de la línea vertical.
   * @param {number} length - Nueva longitud de la línea vertical en mm.
   */
  setVerticalLineLength(length: number): void {
    this.verticalLineLength = length;
  }

  /**
   * Obtiene la longitud de la línea horizontal.
   * @returns {number} Longitud de la línea horizontal en mm.
   */
  getHorizontalLineLength(): number {
    return this.horizontalLineLength;
  }

  /**
   * Establece la longitud de la línea horizontal.
   * @param {number} length - Nueva longitud de la línea horizontal en mm.
   */
  setHorizontalLineLength(length: number): void {
    this.horizontalLineLength = length;
  }

  /**
   * Obtiene el número de estímulos.
   * @returns {number} Número de estímulos.
   */
  getStimulusNumber(): number {
    return this.stimulusNumber;
  }

  /**
   * Establece el número de estímulos.
   * @param {number} number - Nuevo número de estímulos.
   */
  setStimulusNumber(number: number): void {
    this.stimulusNumber = number;
  }

  /**
   * Obtiene el tiempo de ocultación de los estímulos.
   * @returns {number} Tiempo de ocultación en milisegundos.
   */
  getHideTime(): number {
    return this.hideTime;
  }

  /**
   * Establece el tiempo de ocultación de los estímulos.
   * @param {number} time - Nuevo tiempo de ocultación en milisegundos.
   */
  setHideTime(time: number): void {
    this.hideTime = time;
  }
}
