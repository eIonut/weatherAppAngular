import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toCelsius'})
export class convertToCelsiusPipe implements PipeTransform {
  transform(value: number): number {
    return Number((value - 273.15).toFixed(1));
  }
}
