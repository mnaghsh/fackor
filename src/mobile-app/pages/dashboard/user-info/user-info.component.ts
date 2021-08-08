import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../../services/users/users.service";

@Component({
  selector: 'mobile-app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userPosition;
  userInfo;
  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.userInfo = this.usersService.getUserInfo();
    this.userPosition = this.usersService.getUserPosition(this.userInfo['id'])
  }

}
