import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ReportsService } from 'src/web-app/services/reports/reports.service';
import { ActivatedRoute } from '@angular/router';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'web-app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

  newsParams = {
    "text": "",
    "subject": "",
    "mission": {
      "id": null
    },
    "userNews": [
      {
        "receiver": { "id": null }
      }
    ],
    "sender": { "id": null },
    "start_time": null,
    "end_time": null
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  missionUsers;
  loading = true;  
  displayedColumns = ['number', 'sender', 'sender_time', 'subject'];
  constructor(private reportsService: ReportsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.newsParams.mission.id = this.route.parent.snapshot.paramMap.get('id');
    this.getNewsByMissionId();
    this.getUsersByMissionId();
    
  }

  showContent(row) {

      const dialogRef = this.dialog.open(ContentComponent, {
        data: {
          newsData: row
        },
        width: "90%",
        height: "80%"
      })
      dialogRef.afterClosed().subscribe(
        (data) => {
          if (data) {
            row = data;
          }
        }
      )
    

  }

  getNewsByMissionId() {
    this.loading = true;    
    this.reportsService.getNewsByMissionId(this.newsParams).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;      
    });
  }

  getUsersByMissionId(){
    this.reportsService.getUsersByMissionId(297).subscribe(
      (data) => {
        this.missionUsers = data['records'];
      }
    )
  }

}
