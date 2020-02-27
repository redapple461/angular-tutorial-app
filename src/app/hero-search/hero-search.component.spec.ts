import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from '../heroes/heroes.component';
import { Hero } from '../models/hero.model.';
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

describe('Heroes Search Component', () => {
    let component: HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;
    let spy: jasmine.Spy;
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
        fixture = TestBed.createComponent(HeroSearchComponent);
        component = fixture.componentInstance;
        heroService = TestBed.get(HeroService);
        fixture.detectChanges();
        rootElement = fixture.nativeElement;
    });

    it('should exist' , () => {
        expect(component).toBeDefined();
    });

    it('should contain input', () => {
        expect(fixture.debugElement.query(By.css('#search-box'))).toBeDefined();
    });

    it('search input should change searchTerm', () => {
        const input: HTMLInputElement = fixture.debugElement.query(By.css('#search-box')).nativeElement;
        spyOn(component, 'search').and.callThrough();
        input.value = 'mock input';
        input.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(input.value).toEqual('mock input');
    });

    it('should push term to search', (done) => {
        component.search('');
        expect(component.heroes$).toBeDefined();
        done();
    });

    it('shoud ...', (done) => {
        component.ngOnInit();
        component.search('Iron');
        fixture.detectChanges();
        component.search('Ironman');
        done();
    })


});

