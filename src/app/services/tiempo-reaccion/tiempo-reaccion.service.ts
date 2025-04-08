import { Injectable } from '@angular/core';
import { Color } from '../../interfaces/color';
import { Position } from '../../interfaces/position';

@Injectable({
  providedIn: 'root'
})
export class TiempoReaccionService {

  positions: Position[] = [
    { id: 1, nombre: 'x: -150', x: 30, y: 48.5 },
    { id: 2, nombre: 'x: -300', x: 60, y: 48.5 },
    { id: 3, nombre: 'y: -150', x: 48.5, y: 60 },
    { id: 4, nombre: 'y: -300', x: 48.5, y: 80 },
    { id: 5, nombre: 'y: 150', x: 48.5, y: 30 },
    { id: 6, nombre: 'y: 300', x: 48.5, y: 10 },
    { id: 7, nombre: 'x: 150', x: 60, y: 48.5 },
    { id: 8, nombre: 'x: 300', x: 80, y: 48.5 }
  ];

 
  private stimulusNumber: number = 50;  // Número de estímulos a mostrar
  private hiddenStimulusTime: number = 2500; // Tiempo en el que el estímulo se oculta
  private timeToClick: number = 3000; // Tiempo para hacer clic después de que el estímulo se muestre
  private combinationOptions: number[] = [48, 96, 144, 192, 240, 288]; // Opciones disponibles
  private combinationNumbers: number = 48; // Número de combinaciones de colores y posiciones

  constructor() { }

  // Position methods

  getPositions() {
    return this.positions;
  }

  getPositionById(id: number) {
    return this.positions.find(position => position.id === id);
  }

  getPositionByName(name: string) {
    return this.positions.find(position => position.nombre === name);
  }

  getRandomPosition() {
    return this.positions[Math.floor(Math.random() * this.positions.length)];
  }

  editPosition(position: Position) {
    const index = this.positions.findIndex(p => p.id === position.id);
    this.positions[index] = position;
  }

  getStimulusNumber() {
    return this.stimulusNumber;
  }
  
  setStimulusNumber(number: number) {
    this.stimulusNumber = number;
  }

  getHiddenStimulusTime() {
    return this.hiddenStimulusTime;
  }
  
  setHiddenStimulusTime(time: number) {
    this.hiddenStimulusTime = time;
  }

  getTimeToClick() {
    return this.timeToClick;
  }

  setTimeToClick(time: number) {
    this.timeToClick = time;
  }

  getCombinationNumbers() {
    return this.combinationNumbers;
  }

  setCombinationNumbers(number: number) {
    this.combinationNumbers = number;
  }

  getCombinationOptions() {
    return this.combinationOptions;
  }

}
