import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTasks'
})
export class TransformTasksPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
