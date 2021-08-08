import {Component, OnInit, ViewChild, OnChanges} from '@angular/core';
import {DataService} from 'src/web-app/services/data/data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {ReportsService} from 'src/web-app/services/reports/reports.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'web-app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {

  messParams = {
    "text": "",
    "mission": {
      "id": null
    },
    "receiver": {"id": null},
    "sender": {"id": null},
    "start_time": null,
    "end_time": null
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  missionUsers;
  loading = true;
  displayedColumns = ['number', 'sender', 'receiver', 'sender_time', 'text'];

  constructor(private reportsService: ReportsService,
              private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.messParams.mission.id = this.route.parent.snapshot.paramMap.get('id');
    this.getMessageByMissionId();
    this.getUsersByMissionId();
  }

  getMessageByMissionId() {
    this.loading = true;
    this.reportsService.getMessageByMissionId(this.messParams).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  getUsersByMissionId() {
    this.reportsService.getUsersByMissionId(297).subscribe(
      (data) => {
        this.missionUsers = data['records'];
      }
    )
  }

}
