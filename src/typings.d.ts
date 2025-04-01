import 'datatables.net-buttons';

declare module 'datatables.net' {
  interface Config {
    buttons?: any; // Permite usar la propiedad "buttons" en la configuración
  }
}