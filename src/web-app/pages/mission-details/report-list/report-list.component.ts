import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ReportsService } from 'src/web-app/services/reports/reports.service';
import { ActivatedRoute } from '@angular/router';
import { FormContentComponent } from './content/content.component';

@Component({
  selector: 'web-app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})

export class ReportListComponent implements OnInit {

  reportParams = {
    "value": "",
    "mission": { "id": null },
    "creator": { "id": null },
    "receiver": { "id": null },
    "forms": { "id": null },
    "start_time": null,
    "end_time": null
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  missionUsers;
  misssionId;
  reportForms;
  loading = true;
  displayedColumns = ['number', 'creator', 'receiver', 'date'];
  constructor(private reportsService: ReportsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.misssionId = this.route.parent.snapshot.paramMap.get('id');
    this.reportParams.mission.id = this.misssionId;
    this.getUsersByMissionId();
    this.getFormsByMissionId();

  }

  private showContent(row) {
    console.log('rr')
    const dialogRef = this.dialog.open(FormContentComponent, {
      data: {
        reportData: row,
        type: "reports"
      },

      width: "90%",
      height: "80%"
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          console.log('dataa', data)

        }

      }

    )
  }

  getReportByMissionId() {
    this.loading = true;
    this.reportsService.getReportByMissionId(this.reportParams).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  getUsersByMissionId() {
    this.reportsService.getUsersByMissionId(this.misssionId).subscribe(
      (data) => {
        this.missionUsers = data['records'];
      }
    )
  }

  getFormsByMissionId() {
    this.reportsService.getFormsByMissionId().subscribe(
      (data) => {
        this.reportForms = data;
        this.reportParams.forms = this.reportForms[0];
        this.getReportByMissionId(); 
      }
    )
  }

}
