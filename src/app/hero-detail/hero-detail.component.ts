import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero = {name: '', universe: '' };
  selected = '';
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.heroService.share.subscribe((studio: string) => this.selected = studio);
    console.log(this.selected);
   }

  ngOnInit() {
    this.getHero();
  }

  // return hero by name
  getHero() {
    const id = this.route.snapshot.paramMap.get('name');
    this.heroService.getHero(id).subscribe(hero => {
       this.hero.name = hero[0].name;
       this.hero.universe = hero[0].universe;
    });
  }
  // move on privious page
  goBack() {
    this.location.back();
  }
  // save new name of hero
  save(): void {
    this.hero.universe = this.selected;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
