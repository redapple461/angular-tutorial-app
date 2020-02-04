import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';
import { Hero } from '../hero';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

describe('Hero Service', () => {
    let heroService;
    let count: number;
    let mockHero: Hero;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
              HttpClientModule
            ],
            providers: [HeroService, MessageService]
          });
        heroService = TestBed.get(HeroService);
        heroService.getTotalCount().subscribe(res => {
          count = res.count;
        });
        mockHero = {name: 'Mock', universe: ''};
     });

    it('should exist', () => {
      expect(heroService).toBeTruthy();
    });


    it('shoud return all heroes by call getHeroes', (done) => {
      heroService.getHeroes().subscribe(res => {
        expect(res.length).toEqual(count);
        done();
      });
    });

    it('shoud add mock hero ', (done) => {
      heroService.addHero(mockHero).subscribe(res => {
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
      heroService.updateHero(mockHero,'Mock').subscribe(res => {
        expect(res.msg).toEqual('hero was updated!');
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

    it('should return empty array', (done) => {
      heroService.searchHeroes('').subscribe(res => {
        expect(res.length).toEqual(0);
        done();
      });
    });

    it('should return emptry result', (done) => {
      heroService.getHero('te123st').subscribe(res => {
         expect(res.length).toEqual(0);
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

});

