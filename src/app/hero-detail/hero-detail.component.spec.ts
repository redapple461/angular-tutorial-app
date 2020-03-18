import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessagesComponent } from '../messages/messages.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { StudioPipe } from '../services/studio.pipe';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import { By } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { of, Observable } from 'rxjs';
import { SendEmailComponent } from '../send-email/send-email.component';
import { LoginComponent } from '../login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';
import { APP_BASE_HREF } from '@angular/common';


describe('Hero Details Component', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let rootElement: HTMLElement;
    let heroService: HeroService;

    beforeEach(() => {
        localStorage.setItem('userData',JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ'));
        TestBed.configureTestingModule({
          imports: [    MatRadioModule,
              MatButtonModule,
              MatInputModule,
              BrowserAnimationsModule,
              BrowserModule,
              AppRoutingModule,
              MatCardModule,
              FormsModule,
              HttpClientModule],
          declarations: [
              AppComponent,
              HeroesComponent,
              HeroDetailComponent,
              MessagesComponent,
              DashboardComponent,
              HeroSearchComponent,
              StudioPipe,
              SendEmailComponent,
              LoginComponent,
              ChangePasswordComponent,
              RegistrationComponent,
              ProfileComponent
            ],
          providers: [{provide: APP_BASE_HREF, useValue : '/' }, HeroService, MessageService ]
      })
      .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        heroService = fixture.debugElement.injector.get(HeroService);
        rootElement = fixture.nativeElement;
        // fixture.detectChanges();
    });

    it('should created', () => {
        expect(component).toBeDefined();
    });

    it('should call hero service on save', () => {
        component.hero = {name: 'Mock', universe: 'Marvel'};
        component.save();
        expect(spyOn(heroService, 'updateHero').and.callThrough()).toBeTruthy();
    });

    it('should call getHero method on Init' , () => {
        const spy: jasmine.Spy = spyOn(component, 'getHero');
        component.ngOnInit();
        expect(spy.calls.any()).toBeTruthy();
    });


    it('shouldnt display div with hero detail if hero is empty', () => {
        expect(fixture.debugElement.query(By.css('.details'))).toBeNull();
    });


    it('shouldnt get hero by name', () => {
        const spy: jasmine.Spy = spyOn(heroService, 'getHero').and.returnValue(of(component.hero));
        component.getHero();
        expect(spy).toHaveBeenCalled();
    });
});
