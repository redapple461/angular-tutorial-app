import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../hero';

@Pipe({
  name: 'universeSort'
})
export class StudioPipe implements PipeTransform {
  transform(heroes: Hero[] = [], search: string= ''): Hero[] {
    if (!search.trim()) {
      return heroes;
    }
    return heroes.filter(hero => {
      return hero.universe.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}



