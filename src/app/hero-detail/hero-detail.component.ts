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

  hero: Hero;
  oldName: string;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {  }

  ngOnInit() {
    this.getHero();
  }

  // return hero by name
  getHero() {
    this.oldName = this.route.snapshot.paramMap.get('name');
    this.heroService.getHero(this.oldName).subscribe(hero => {
      this.hero = hero[0];
      console.log(hero[0].universe);
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
