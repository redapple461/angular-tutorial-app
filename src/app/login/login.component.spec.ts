import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MatCardModule} from '@angular/material/card';
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
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { StudioPipe } from '../services/studio.pipe';
import { SendEmailComponent } from '../send-email/send-email.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { ResponseInterface } from '../models/response.model';
import { APP_BASE_HREF } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [    MatRadioModule,
          MatButtonModule,
          MatInputModule,
          BrowserAnimationsModule,
          MatCardModule,
          BrowserModule,
          AppRoutingModule,
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
      providers: [{provide: APP_BASE_HREF, useValue : '/' }, HeroService, MessageService, AuthService ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should regForm', () => {
    component.regForm();
  });

  it('should sign in by defualt user', () => {
    component.email = 'dima.balakishiev.99@mail.ru';
    component.password = '12345678';
    // const spy: jasmine.Spy = spyOn(authService, 'signIn');
    component.signIn();
    expect(component.email).toBe('dima.balakishiev.99@mail.ru');
  });
 
});

