import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primerLetraMayuscula'
})
export class PrimerLetraMayusculaPipe implements PipeTransform {

  transform(value: any, args?: any[]): unknown {
    if (value != null) {
      return value.toUpperCase().charAt(0)
    }
    
    return null;
  }

}
