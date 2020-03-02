import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model.';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  oldName: string;
  selected: string;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {  }

  ngOnInit() {
    this.getHero();
    this.selected = this.hero.universe;
  }

  // return hero by name
  getHero(): void {
    this.oldName = this.route.snapshot.paramMap.get('name') || 'Ironman';
    console.log(this.oldName);
    this.heroService.getHero(this.oldName).subscribe(hero => {
      try {
        this.hero = hero;
      } catch (e) { }
    });
  }
  // move on privious page
  goBack() {
    this.location.back();
  }
  // save new name of hero
  save(): void {
    this.heroService.updateHero(this.hero, this.oldName)
      .subscribe(() => this.goBack());
  }

}
