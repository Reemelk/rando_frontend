import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'typefightString'})
export class TypefightString implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'DROP' : 'XP';
  }
}
