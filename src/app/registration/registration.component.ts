import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public email: string;
  public name: string;
  public surname: string;
  public phone: string;
  public password: string;
  constructor(public authSerivce: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authSerivce.register(this.email, this.name, this.surname, this.phone, this.password).subscribe((res: any) => {
      if (res.error) {
        alert(res.error);
      }
      alert(res.message);
    });
  }

}
