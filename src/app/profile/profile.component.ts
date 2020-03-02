import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: User;
  private userId = JSON.parse(localStorage.getItem('userData')).user._id;
  constructor(private userService: UserService, private location: Location) {

  }

  public goBack() {
    this.location.back();
  }

  public save() {
    this.userService.updateUser(this.user._id, this.user).subscribe(res => {
      console.log(res);
    })
  }
  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }

}
