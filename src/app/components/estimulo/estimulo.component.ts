import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-estimulo',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estimulo.component.html',
  styleUrl: './estimulo.component.scss'
})
export class EstimuloComponent {
  @Input('color') color: string = 'black';
}
