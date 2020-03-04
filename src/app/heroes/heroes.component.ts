import { Component, OnInit } from '@angular/core';
import {Hero} from '../models/hero.model.';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  selected = '';
  addUniverse = '';
  constructor(private heroService: HeroService) {
    // this.heroService.share.subscribe(studio => this.selected = studio);
    this.selected = this.heroService.getStudio();
  }
  // add hero
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({name, universe: this.addUniverse} as Hero)
      .subscribe(hero => {
        try {
         this.heroes.push(hero);
        } catch (e) {
        }
      });
    this.getHeroes();
  }
  // delete hero
  delete(hero: Hero): void {
    console.log(hero);
    this.heroes = this.heroes.filter(h => h.name !== hero.name);
    console.log(this.heroes);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit() {
    this.getHeroes();
  }
  // gero all heroes
  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
        // console.log(heroes);
        this.heroes = heroes;
      });
  }
  // set selectedHero
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
