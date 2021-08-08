import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../services/users/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  forms;
  panelOpenState = false;
  navlinks: Array<{ label: string, path: any, icon: any }>;

  constructor(public userService: UsersService,
              private myRoute: Router) {

    // this.navlinks = [
    //   { label: ' گزارش یک', path: "reports", icon: "fas fa-archive" },
    //   { label: 'گزارش دو', path: "reports", icon: "fas fa-archive" }

    // ];
  }

  openForm(id) {
    //  this.myRoute.navigate(['report/reports',id]);

  }

  ngOnInit() {
    // ;
    this.forms = this.userService.getFromLocalStorageGroupByUser('reportForms');
    console.log('tip5', this.forms)
  }

  isNotMainCommander() {
    const user = this.userService.getUserInfo();
    const commanderId = this.userService.getOrgForFight().id;
    const userDetails = this.userService.getOrgForFightById(user.id);
    if (commanderId === userDetails.orgForFight.id) {
      return false;
    }
    return true;
  }

}
