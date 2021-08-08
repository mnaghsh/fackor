import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MissionService} from '../../../services/mission/mission.service';

interface Mission extends ArrayBuffer {
  id: string;
  name: string;
  enable: string;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public id: string;
  public mission = {};
  public detailsMenu = [
    {name: 'یگان های برای رزم', link: 'org-for-fight'},
    {name: 'پیام', link: 'report/message'},
    {name: 'خبر', link: 'report/news'},
    {name: 'گزارش وضعیت', link: 'report/form'},
    {name: 'مشخصات عملیات', link: 'users'},
    {name: 'راهنمای کاربری', link: 'users'},
  ];

  constructor(private route: ActivatedRoute,
              private missionService: MissionService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.missionService.getMissionById(this.id).subscribe(
      (data: Mission) => {
        this.mission = data;
      },
      (error) => {
        console.log(error);
      });
  }
}
