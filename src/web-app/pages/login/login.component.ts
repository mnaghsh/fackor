import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MissionService} from '../../services/mission/mission.service';
import {AuthService} from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;

  constructor(public missionService: MissionService,
              private fb: FormBuilder,
              private myRoute: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
  }


  private confirmEvent(e) {
    if (e = "success") {
      // this.myRoute.navigate(['/missions/list']);
      this.myRoute.navigateByUrl('home');
      this.auth.sendToken('true');
    }
  }

  login() {}

}
