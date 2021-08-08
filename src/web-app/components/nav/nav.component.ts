import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../services/mission/mission.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public auth: AuthService,
              public mission: MissionService) {
  }

  ngOnInit() {
  }

  logout() {
    this.mission.logout().subscribe();
    this.auth.logout();
  }

}
