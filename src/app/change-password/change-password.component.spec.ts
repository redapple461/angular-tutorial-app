import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
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
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ResponseInterface } from '../models/response.model';
import { of } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let authService;

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
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }, HeroService, MessageService, AuthService, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVlNWEwYjA2NzVmZDQ3YjA4NDNlNWMiLCJpYXQiOjE1ODMzMTcxMzl9.USRfyGBxF61mq7yiG5u7UxiIrYsGJbSc9bHgp8iQWrQ', // represents the bookId
            },
          },
        },
      },]
  })
  .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return password is missing when fistPassword = "" ', (done) => {
    spyOn(window, 'alert');
    component.send();
    expect(window.alert).toHaveBeenCalledWith('Password is missing');
    done();
  });

  it('should return password is missing when confirmPassword = "" ', (done) => {
    spyOn(window, 'alert');
    component.firstPassword = '1';
    component.send();
    expect(window.alert).toHaveBeenCalledWith('Password is missing');
    done();
  });

  it('should return password are not equal when firstPassword != confirmPassword ', (done) => {
    spyOn(window, 'alert');
    component.firstPassword = '1';
    component.confirmPassword = '2';
    component.send();
    expect(window.alert).toHaveBeenCalledWith('Password are not equal');
    done();
  });

  it('should return Min length is 7 when firstPassword.length < 7 ', (done) => {
    spyOn(window, 'alert');
    component.firstPassword = '123456';
    component.confirmPassword = '123456';
    component.send();
    expect(window.alert).toHaveBeenCalledWith('Min length is 7');
    done();
  });

  it('should return Check email when all is right', (done) => {
    const spy: jasmine.Spy = spyOn(authService, 'changePassword').and.returnValue(of(ResponseInterface));
    component.firstPassword = '12345678';
    component.confirmPassword = '12345678';
    component.send();
    expect(spy).not.toHaveBeenCalled();
    done();
  });
});
