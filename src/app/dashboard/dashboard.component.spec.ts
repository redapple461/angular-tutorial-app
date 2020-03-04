import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
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
import { Hero } from '../models/hero.model.';
import {MatCardModule} from '@angular/material/card';
import { SendEmailComponent } from '../send-email/send-email.component';
import { LoginComponent } from '../login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';


describe('DashBoard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let rootElement: HTMLElement;
    let heroService: HeroService;
    let messageService: MessageService;

    beforeEach(() => {
        localStorage.setItem('userData',
          JSON.stringify(
            {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ',
              userId: '5e5e5a0b0675fd47b0843e5c'
            }
        ));
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
            providers: [ HeroService, MessageService ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        heroService = fixture.debugElement.injector.get(HeroService);
        messageService = fixture.debugElement.injector.get(MessageService);
        rootElement = fixture.nativeElement;
    });

    it('should create dashboard' , () => {
        expect(component).toBeDefined();
    });

    it('ngOnInit should call getHeroes', () => {
        const spy: jasmine.Spy = spyOn(component, 'getHeroes');
        component.ngOnInit();
        expect(spy.calls.any()).toBeTruthy();
    });


    it('should contain link to heroes', () => {
        expect(rootElement.querySelector('a').textContent).toEqual('Heroes');
        expect(rootElement.querySelector('a').attributes[2].value).toEqual('/heroes');
    });

    it('should contain search component', () => {
        expect(rootElement.querySelector('app-hero-search')).toBeDefined();
    });

    it('should contain <h3> Last Heroes </h3> ', () => {
        expect(rootElement.querySelector('h3').textContent).toEqual('Last Heroes');
    });

    it('should contain div with heroes', () => {
        expect(fixture.debugElement.query(By.css('.grid')).children).toBeTruthy();
    });

    it('should call hero service on getHeroes', () => {
        component.getHeroes();
        expect(spyOn(heroService, 'getHeroes').and.callThrough()).toBeTruthy();
    });





});
