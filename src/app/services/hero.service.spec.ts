import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';
import { Hero } from '../models/hero.model.';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { compileComponentFromMetadata } from '@angular/compiler';

describe('Hero Service', () => {
    let heroService;
    let mockHero: Hero;
    let messageService: MessageService;

    beforeEach(() => {
      localStorage.setItem('userData', JSON.stringify({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
       }));
        TestBed.configureTestingModule({
            imports: [
              HttpClientModule
            ],
            providers: [HeroService, MessageService]
          });
        heroService = TestBed.get(HeroService);
        /*heroService.getTotalCount().subscribe(res => {
          count = res.count;
        });*/
        mockHero = {name: 'Mock', universe: 'Marvel'};
        messageService = TestBed.get(MessageService);
     });

    it('should exist', () => {
      expect(heroService).toBeTruthy();
    });



    it('shoud add mock hero ', (done) => {
      heroService.addHero(mockHero).subscribe(res => {
        expect(res.name).toEqual(mockHero.name);
        done();
      });
    });

    it('shoud found mock hero', (done) => {
      heroService.searchHeroes(mockHero.name).subscribe( res => {
        expect(res.name).toEqual('Mock');
        done();
      });
    });



});

