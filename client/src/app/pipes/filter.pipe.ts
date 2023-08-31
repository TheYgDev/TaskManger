import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propNames: string[]): any[] {
    const result: any = [];
    if (!value || filterString === '' || propNames.length === 0) {
      return value;
    }
    outerLoop: for (const a of value) {
      for (const propName of propNames) {
        if (a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
          result.push(a);
          continue outerLoop;
        }
      }
    }
   return result;
    
  }
}
