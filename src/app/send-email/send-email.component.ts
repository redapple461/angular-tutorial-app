import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  public email: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public send() {
    this.authService.sendEmail(this.email).subscribe(res => {
      if ( res.error ) {
        return alert(res.error);
      }
      alert(res.message);
    });
  }

}
