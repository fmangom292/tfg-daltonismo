import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const seconds = value / 1000;
    if (seconds < 60) {
      return `${seconds.toFixed(2)} segundos`;
    }
    const minutes = seconds / 60;
    return `${minutes.toFixed(2)} minutos`;
  }

}
