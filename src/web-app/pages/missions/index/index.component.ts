import { Component, OnInit } from '@angular/core';
import {MissionService} from '../../../services/mission/mission.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public link;
  public id: number;
  public name: string;
  public startTime: Date;
  public endTime: Date;
  public mainDetailComponent: any;
  // public missionId = this.navParams.get('id');
  navLinks: Array<{ lable: string, path: any, icon: string }>;

  constructor(public missionProvider: MissionService) {
    this.navLinks = [
      // {lable: 'عملیات های فعال', path: 'list', icon: 'git-network'},
      // {lable: 'عملیات های غیر فعال', path: 'list', icon: 'contacts'},
      {lable: 'اضافه کردن عملیات', path: 'add', icon: 'add-circle'},
    ];
    this.getMission();

  }

  ngOnInit() {
    console.log('mission-tree loaded');
    this.link = 'list';
  }



  public showMainView(view) {
    this.mainDetailComponent = view.component;
  }


  public getMission() {
    // this.missionProvider.getMissionById(this.missionId).subscribe(
    //   (data: Details) => {
    //     this.id = data.id;
    //     this.name = data.name;
    //     this.startTime = data.startTime;
    //     this.endTime = data.endTime;
    //   }
    // );
  }

}
