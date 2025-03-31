import { Injectable } from '@angular/core';
import { Color } from '../../interfaces/color';
import { Position } from '../../interfaces/position';

@Injectable({
  providedIn: 'root'
})
export class TiempoReaccionService {

  private colors: Color[] = [
    { id: 1, nombre: 'Gris', hex: '#808080' },
    { id: 2, nombre: 'Rojo', hex: '#FF0000' },
    { id: 3, nombre: 'Verde', hex: '#00FF00' },
    { id: 4, nombre: 'Azul', hex: '#0000FF' },
    { id: 5, nombre: 'Amarillo', hex: '#FFFF00' },
    { id: 6, nombre: 'Rosa', hex: '#FFC0CB' }
  ];

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

  // Número de estímulos a mostrar
  private stimulusNumber: number = 50;

  // Tiempo en el que el estímulo se oculta
  private hiddenStimulusTime: number = 2500;

  constructor() { }

  // Color methods

  getColors() {
    return this.colors;
  }

  getColorById(id: number) {
    return this.colors.find(color => color.id === id);
  }

  getColorByHex(hex: string) {
    return this.colors.find(color => color.hex === hex);
  }

  getColorByName(name: string) {
    return this.colors.find(color => color.nombre === name);
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  editColor(color: Color) {
    const index = this.colors.findIndex(c => c.id === color.id);
    this.colors[index] = color;
    console.log('Color edited', color);
    console.log('Colors', this.colors);


  }

  addColor(color: Color) {
    this.colors.push(color);
  }

  deleteColor(id: number) {
    this.colors = this.colors.filter(color => color.id !== id);
  }

  setColors(colors: Color[]) {
    this.colors = colors;
  }

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

  // Stimulus methods
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

}
