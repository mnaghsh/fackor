import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../../services/users/users.service";

@Component({
  selector: 'mobile-app-mission-info',
  templateUrl: './mission-info.component.html',
  styleUrls: ['./mission-info.component.css']
})
export class MissionInfoComponent implements OnInit {

  userMission;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.userMission = this.usersService.getMission();
  }

}
