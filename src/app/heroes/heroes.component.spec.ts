import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';

import { AppComponent } from '../app.component';
import { FormsModule} from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessagesComponent } from '../messages/messages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { StudioPipe } from '../services/studio.pipe';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroService: HeroService;
    let mockHero: Hero;
    let rootElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [    MatRadioModule,
                MatButtonModule,
                MatInputModule,
                BrowserAnimationsModule,
                BrowserModule,
                AppRoutingModule,
                FormsModule,
                HttpClientModule],
            declarations: [  AppComponent,
                HeroesComponent,
                HeroDetailComponent,
                MessagesComponent,
                DashboardComponent,
                HeroSearchComponent,
                StudioPipe],
            providers: [ HeroService, MessageService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        heroService = fixture.debugElement.injector.get(HeroService);
        mockHero = {id: 99 , name: 'Mock', universe: 'MochUn'};
        fixture.detectChanges();
        rootElement = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should contain link to dashboard', () => {
        expect(rootElement.querySelector('a').textContent).toEqual('Dashboard');
        expect(rootElement.querySelector('a').attributes[2].value).toEqual('/dashboard');
    });

    it('should contain list for heroes', () => {
        expect(rootElement.querySelector('ul')).toBeDefined();
    });

    it('should contain checkbox for universe choose', () => {
        const marvel = fixture.debugElement.queryAll(By.css('.example-margin'))[0];
        const dc = fixture.debugElement.queryAll(By.css('.example-margin'))[1];
        expect(marvel.attributes.value).toEqual('MARVEL');
        expect(dc.attributes.value).toEqual('DC');
    });

    it('should call addHero by press add btn', () => {
        const btn = rootElement.querySelector('button');
        expect(btn.textContent.trim()).toEqual('add');
    });

    it('should  return empty name', () => {
        expect(component.add('')).toBeFalsy();
    });

    it('should call hero service on add', () => {
        const spy: jasmine.Spy = spyOn(heroService, 'addHero').and.returnValue(of(component.selectedHero));
        component.add('Test');
        expect(spy).toHaveBeenCalled();
    });


    it('should call hero service on delete', () => {
        const spy: jasmine.Spy = spyOn(heroService, 'deleteHero').and.returnValue(of(component.selectedHero));
        component.heroes = [];
        component.delete({name: 'Test', universe: ''});
        expect(spy).toHaveBeenCalled();
    });

});
