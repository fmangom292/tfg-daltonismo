import { Component, OnInit } from '@angular/core';
import { BackButtonComponent } from "../../components/back-button/back-button.component";

@Component({
  selector: 'app-test-muller-lyer',
  imports: [BackButtonComponent],
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
    
  }
  
  setLineLength(length: number): void {
    this.line1Length = length;
  }


}
