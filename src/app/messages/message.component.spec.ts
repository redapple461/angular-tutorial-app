import { TestBed, ComponentFixture, async } from '@angular/core/testing';
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
import { MessagesComponent } from './messages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { StudioPipe } from '../services/studio.pipe';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import {MatCardModule} from '@angular/material/card';
import { SendEmailComponent } from '../send-email/send-email.component';
import { LoginComponent } from '../login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';


describe('Message component', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;
    let divElement: HTMLElement;
    beforeEach(async(() => {
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        divElement = fixture.nativeElement;
    });

    it('should create', (done) => {
        expect(component).toBeDefined();
        done();
    });

    it('component should be empty when zero msgs', (done) => {
        expect(divElement.querySelector('*')).toBeNull(null);
        done();
    });


    it('component should contain button and msg list', (done) => {
        component.messageService.add('msg');
        component.messageService.add('msg2');
        fixture.detectChanges();
        expect(divElement.querySelector('button')).toBeDefined();
        expect(divElement.querySelector('h2')).toBeDefined();
        done();
    });

    it('msg list shoud clean up after button click', (done) => {
        component.messageService.add('msg');
        component.messageService.add('msg2');
        fixture.detectChanges();
        const button = divElement.querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(component.messageService.messages.length).toEqual(0);
        done();
    })

});
