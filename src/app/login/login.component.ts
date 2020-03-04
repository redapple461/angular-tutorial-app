import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(private authService: AuthService, private location: Location) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  regForm() {
    this.location.go('/registration');
  }

  signIn() {
    this.authService.signIn(this.email, this.password).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('userData', JSON.stringify(res));
      this.location.go('/dashboard');
    });
  }



}
