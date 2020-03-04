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

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

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
      providers: [ HeroService, MessageService ]
  })
  .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
