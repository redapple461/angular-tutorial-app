import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../models/hero.model.';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  heroes: Hero[] = [];
  selected = '';

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.heroService.setStudio(this.selected);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.slice(heroes.length - 4, heroes.length).reverse();
      });
  }
}
