import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private email: string;
  private name: string;
  private surname: string;
  private phone: string;
  private password: string;
  constructor(private authSerivce: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authSerivce.register(this.email, this.name, this.surname, this.phone, this.password).subscribe((res: any) => {
      if (res.error) {
        alert(res.error.message);
      }
      alert(res.message);
    });
  }

  back() {
    console.log('back');
  }

}
