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
    localStorage.setItem('userData',JSON.stringify({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'
    }));
    beforeEach(() => {
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
        console.log('asdasd '+res);
        expect(res.name).toEqual(mockHero.name);
        done();
      });
    });

    it('shoud found mock hero', (done) => {
      heroService.searchHeroes(mockHero.name).subscribe( res => {
        expect(res[0].name).toEqual('Mock');
        done();
      });
    });

    it('shoud update previous mock hero ', (done) => {
      mockHero.name = 'updateMock';
      heroService.updateHero(mockHero, 'Mock').subscribe(res => {
        expect(res.message).toEqual('Hero Mock was updated!');
        done();
      });
    });

    it('shoud delete previous mock hero ', (done) => {
      mockHero.name = 'updateMock';
      heroService.deleteHero(mockHero).subscribe(res => {
        expect(res.msg).toEqual('all is ok');
        done();
      });
    });



    it('should return empty hero, but take name from hero name', (done) => {
      mockHero.name = 'updateMock';
      heroService.deleteHero(mockHero.name).subscribe(res => {
        expect(res.msg).toEqual('all is ok');
        done();
      });
    });

    it('should handle error on wrong url', (done) => {
      heroService.setUrl('http://localhost/4000/3');
      heroService.getHeroes().subscribe(r => {
        console.log(messageService.messages);
        expect(messageService.messages[1]).toContain('failed');
        done();
      });
    });


});

