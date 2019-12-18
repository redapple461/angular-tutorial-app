import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero'
import { HeroService } from '../services/hero.service';
import { Input} from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  selected = "";
  addStudio = "";
  constructor(private heroService: HeroService){
    // this.heroService.share.subscribe(studio => this.selected = studio);
    this.selected = this.heroService.getStudio();
    console.log(this.selected);
  }
  // add hero
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        hero.universe = this.addStudio;
        this.heroes.push(hero);
      });
  }
  // delete hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit() {
    this.getHeroes();
  }
  //gero all heroes
  getHeroes(){
    this.heroService.getHeores().subscribe(heroes => this.heroes = heroes);
  }
  // set selectedHero
  onSelect(hero: Hero){
    this.selectedHero = hero;
  }
  
 

}
