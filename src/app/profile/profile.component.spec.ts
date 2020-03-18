import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
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
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import { MatCardModule } from '@angular/material/card';
import { APP_BASE_HREF } from '@angular/common';
//import { UserService } from '../services/user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
 // let UserService: UserService;

  beforeEach(async(() => {
      localStorage.setItem('userData', JSON.stringify(
        {
          user:{
            _id: '5e5e5a0b0675fd47b0843e5c',
            name: 'Dima',
            surname: 'Balakishyieu',
            email: 'dima.balakishiev.99@mail.ru',
            phone: '375292309343'
          }
        }
      ))
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
        providers: [{provide: APP_BASE_HREF, useValue : '/' }, HeroService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    // UserService = fixture.debugElement.injector.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    component.user = {
      _id: '5e5e5a0b0675fd47b0843e5c',
      name: 'Dima',
      surname: 'Balakishyieu',
      email: 'dima.balakishiev.99@mail.ru',
      password: '1234567'
    }
    component.save();
  });

  it('should goBack', () => {
    component.goBack();
  })
});
