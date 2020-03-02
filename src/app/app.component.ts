import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'hero-tour';
  constructor(private messageService: MessageService){}
  logout() {
    this.messageService.clear();
    localStorage.removeItem('userData');
  }
}
