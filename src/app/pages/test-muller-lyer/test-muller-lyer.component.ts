import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-muller-lyer',
  imports: [],
  templateUrl: './test-muller-lyer.component.html',
  styleUrl: './test-muller-lyer.component.scss'
})
export class TestMullerLyerComponent implements OnInit {
  line1Length: number = 8; // Longitud inicial de las líneas en píxeles
  line2Length: number = 8; // Longitud inicial de las líneas en píxeles
  // Método para cambiar dinámicamente la longitud
  
  minLineLength: number = 8; // Longitud mínima de las líneas
  maxLineLength: number = 12; // Longitud máxima de las líneas
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  setLineLength(length: number): void {
    this.line1Length = length;
  }


}
