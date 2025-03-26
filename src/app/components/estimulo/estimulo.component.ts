import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Color } from '../../interfaces/color';

@Component({
  selector: 'app-estimulo',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estimulo.component.html',
  styleUrl: './estimulo.component.scss'
})
export class EstimuloComponent {
  @Input('color') color!: Color;
}
