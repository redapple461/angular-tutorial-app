import { MessageService } from "./message.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from './hero.service';

describe('Message Service', () => {
    let msgService;
    let heroService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
              HttpClientModule
            ],
            providers: [HeroService, MessageService]
          });
        heroService = TestBed.get(HeroService);
        msgService = TestBed.get(MessageService);
    });

    it('should add msg after get', (done)=>{
        heroService.getHeroes().subscribe(res => {
            expect(msgService.messages).toContain('HeroService: fetched heroes');
            done();
        });
    });
});