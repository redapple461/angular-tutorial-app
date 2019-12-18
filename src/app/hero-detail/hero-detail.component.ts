import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero' 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  selected = "";
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.heroService.share.subscribe(studio => this.selected = studio);
    console.log(this.selected);
   }

  ngOnInit() {
    this.getHero();
  }
  
 
  // return hero by id
  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  // move on privious page
  goBack(){
    this.location.back();
  }
  //save new name of hero
  save(): void {
    this.hero.universe = this.selected;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  
}
