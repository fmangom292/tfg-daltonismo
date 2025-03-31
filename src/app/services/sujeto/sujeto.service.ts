import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SujetoService {

  // Variables para almacenar los datos del sujeto
  private nombre: string = 'Sujeto 1';

  constructor() { }

  // Método para establecer el nombre del sujeto
  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  // Método para obtener el nombre del sujeto
  getNombre(): string {
    return this.nombre;
  }

}
