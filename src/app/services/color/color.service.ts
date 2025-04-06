import { Injectable } from '@angular/core';
import { Color } from '../../interfaces/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private colors: Color[] = [
    { id: 1, nombre: 'Gris', hex: '#808080' },
    { id: 2, nombre: 'Rojo', hex: '#FF0000' },
    { id: 3, nombre: 'Verde', hex: '#00FF00' },
    { id: 4, nombre: 'Azul', hex: '#0000FF' },
    { id: 5, nombre: 'Amarillo', hex: '#FFFF00' },
    { id: 6, nombre: 'Rosa', hex: '#FFC0CB' }
  ];

  private backgroundColor: Color = { id: 7, nombre: 'Fondo', hex: '#FFFFFF' };

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

  getBackgroundColor() {
    return this.backgroundColor;
  }

  setBackgroundColor(color: Color) {
    this.backgroundColor = color;
  }




}
