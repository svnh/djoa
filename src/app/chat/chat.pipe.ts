import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortMessage'})
export class ChatPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    if(value.length > 30)
      return value.substring(0, 30) + ' [...]';
    return value
  }
}
