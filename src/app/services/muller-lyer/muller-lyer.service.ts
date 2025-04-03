import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar la lógica de la ilusión de Müller-Lyer.
 * Proporciona configuraciones como la longitud de las líneas, el número de estímulos
 * y los valores mínimos y máximos de las líneas.
 */
@Injectable({
  providedIn: 'root'
})
export class MullerLyerService {
  /**
   * Longitud inicial de la línea 1 en píxeles.
   * @private
   */
  private line1Length: number = 10;

  /**
   * Longitud inicial de la línea 2 en píxeles.
   * @private
   */
  private line2Length: number = 10;

  /**
   * Número total de estímulos.
   * @private
   */
  private stimulusNumber: number = 250;

  /**
   * Longitud mínima permitida para las líneas.
   * @private
   */
  private minLineLength: number = 8;

  /**
   * Longitud máxima permitida para las líneas.
   * @private
   */
  private maxLineLength: number = 12;


  /**
   * Tiempo en milisegundos para ocultar las líneas.
   * @private
   */
  private hideLinesTime: number = 500; 
  constructor() {}

  // Getters y Setters para las propiedades de la clase

  /**
   * Obtiene la longitud de la línea 1.
   * @returns {number} Longitud de la línea 1.
   */
  getLine1Length(): number {
    return this.line1Length;
  }

  /**
   * Establece la longitud de la línea 1.
   * @param {number} length - Nueva longitud de la línea 1.
   */
  setLine1Length(length: number) {
    this.line1Length = length;
  }

  /**
   * Obtiene la longitud de la línea 2.
   * @returns {number} Longitud de la línea 2.
   */
  getLine2Length(): number {
    return this.line2Length;
  }

  /**
   * Establece la longitud de la línea 2.
   * @param {number} length - Nueva longitud de la línea 2.
   */
  setLine2Length(length: number) {
    this.line2Length = length;
  }

  /**
   * Obtiene el número total de estímulos.
   * @returns {number} Número de estímulos.
   */
  getStimulusNumber(): number {
    return this.stimulusNumber;
  }

  /**
   * Establece el número total de estímulos.
   * @param {number} number - Nuevo número de estímulos.
   */
  setStimulusNumber(number: number) {
    this.stimulusNumber = number;
  }

  /**
   * Obtiene la longitud mínima permitida para las líneas.
   * @returns {number} Longitud mínima de las líneas.
   */
  getMinLineLength(): number {
    return this.minLineLength;
  }

  /**
   * Establece la longitud mínima permitida para las líneas.
   * @param {number} length - Nueva longitud mínima de las líneas.
   */
  setMinLineLength(length: number) {
    this.minLineLength = length;
  }

  /**
   * Obtiene la longitud máxima permitida para las líneas.
   * @returns {number} Longitud máxima de las líneas.
   */
  getMaxLineLength(): number {
    return this.maxLineLength;
  }

  /**
   * Establece la longitud máxima permitida para las líneas.
   * @param {number} length - Nueva longitud máxima de las líneas.
   */
  setMaxLineLength(length: number) {
    this.maxLineLength = length;
  }

  /**
   * Obtiene el tiempo en milisegundos para ocultar las líneas.
   * @returns {number} Tiempo de ocultación de las líneas.
   */
  getHideLinesTime(): number {
    return this.hideLinesTime;
  }

  /**
   * Establece el tiempo en milisegundos para ocultar las líneas.
   * @param {number} time - Nuevo tiempo de ocultación de las líneas.
   */
  setHideLinesTime(time: number) {
    this.hideLinesTime = time;
    console.log(`Tiempo de ocultación de líneas actualizado a: ${this.hideLinesTime} ms`);
  }
}
