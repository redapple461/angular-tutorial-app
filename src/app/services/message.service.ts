import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // messages to log
  messages: string[] = [];
  // add log message
  add(message: string) {
    this.messages.push(message);
  }
  // clear log messages
  clear() {
    this.messages = [];
  }
}
