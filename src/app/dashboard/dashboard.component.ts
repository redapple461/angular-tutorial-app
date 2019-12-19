import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit,OnDestroy {

  
  heroes: Hero[] = [];
  selected = "";

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.heroService.setStudio(this.selected);
  }

  getHeroes(): void {
    this.heroService.getHeores()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}