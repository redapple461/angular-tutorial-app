import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import bcrytp from 'bcryptjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public firstPassword = '';
  public confirmPassword = '';
  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  async send() {
    if (this.firstPassword === '' || this.confirmPassword === '') {
      return alert('Password is missing');
    } else {
      if (this.firstPassword !== this.confirmPassword) {
        return alert('Password are not equal');
      } else {
        if (this.firstPassword.length < 7) {
          return alert('Min length is 7');
        } else {
          const hashPassword = await bcrytp.hash(this.firstPassword, 5);
          return  this.authService.changePassword(hashPassword, this.route.snapshot.paramMap.get('token')).subscribe(res => {
            if (res.error) {
              return alert(res.error);
            }
            alert (res.message);
          });
        }
      }
    }
  }

}
