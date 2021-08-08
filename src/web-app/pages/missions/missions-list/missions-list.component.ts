import {Component, OnInit, ViewChild} from '@angular/core';
import {MissionService} from '../../../services/mission/mission.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {delay} from 'q';
import {AccessibleService} from "../../../../services/accessible/accessible.service";

export interface Record extends ArrayBuffer {
  edit;
  enable?: boolean;
  id?: number;
  name: string;
  startTime: any;
  endTime: any;
  orgForFight?: { id: number, class?: string };
}

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css']
})
export class MissionsListComponent implements OnInit {
  mhd;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])
  missionModel: Record;
  displayedColumns = ['select', 'number', 'name', 'startTime', 'endTime', 'showMission', 'update'];
  public missions

  constructor(private missionProvider: MissionService,
              private accessibleService: AccessibleService) {
    this.getMissions();
  }

  ngOnInit() {
    this.missionModel = {} as Record;
    this.missionModel.orgForFight = {id: 8};
  }

  public getMissions() {
    this.missionProvider.getAllMissions()
      .subscribe(
        (data: Record) => {
          this.missions = data;
          this.dataSource = new MatTableDataSource(this.missions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private addMission() {

    this.missionModel.orgForFight = {id: 8};
    if (this.missionModel.name != null && this.missionModel.startTime != null && this.missionModel.endTime != null) {
      console.log(this.missionModel.startTime, 'this.missionModel')
      let mhd = Object.assign({}, this.missionModel)
      this.missionProvider.putMissions(this.missionModel).subscribe(
        (data) => {
          this.dataSource.data.unshift(mhd);

          this.paginator._changePageSize(this.paginator.pageSize);
          this.missionModel.name = null;
          this.missionModel.startTime = null;
          this.missionModel.endTime = null;

        },
        (error) => {
          this.mhd = error.error.text;
        }
      );
      this.mhd = ""
    }
    else {
      this.mhd = "برای افزودن ماموریت باید همه مقادیر را تکمیل کنید"
    }
  }

  private editMission(e) {

    this.missionModel.orgForFight = {id: 8, class: "unit"};
    this.missionModel.enable = false;
    console.log('this.userModel', e)
    if (e.editedname != null && e.editedstartTime != null && e.editedendTime != null) {
      this.missionModel.id = e.id;
      this.missionModel.name = e.editedname;
      this.missionModel.startTime = e.editedstartTime;
      this.missionModel.endTime = e.editedendTime;
      // this.missionModel.enable = e.editedlastname;
      console.log('model for edit', this.missionModel)
      this.missionProvider.editMissions(this.missionModel).subscribe(
        (data) => {
          this.paginator._changePageSize(this.paginator.pageSize);
          e.name = e.editedname;
          e.startTime = e.editedstartTime;
          e.endTime = e.editedendTime;
          this.missionModel.name = null;
          this.missionModel.startTime = null;
          this.missionModel.endTime = null;

        }
        ,
        (error) => {
          this.mhd = error.error.text;
        }
      );
      this.mhd = ""
    }
    else {
      this.mhd = "برای ویرایش ماموریت باید همه مقادیر را تکمیل کنید"
    }

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {

    this.dataSource.filterPredicate = (row, filter) => {
      // ;
      console.log('row', row)
      console.log('filter', filter)
      if (
        row.name.indexOf(filter) >= 0
      )
        return true;

      return false;

    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteSelectedNews() {
    this.accessibleService.showConfirm().subscribe(
      (data) => {
        if (data == 1) {
          this.selection.selected.forEach(row => {
            this.missionProvider.deleteMissions(row.id).subscribe(
              () => {
                console.log('next')
                for (let i = this.dataSource.data.length - 1; i >= 0; i--) {
                  if (row.id == this.dataSource.data[i].id) {

                    this.dataSource.data.splice(i, 1);
                  }
                }
                this.paginator._changePageSize(this.paginator.pageSize);
              },
              (error) => {
                console.log(error)
                console.log('حذف انجام نشد');
              },
              () => {
                console.log('comp');
              }
            );
          });
        }
      });
  }

  rename(row) {

    row.edit = !row.edit
    if (row.edit == false) {
      this.editMission(row);
    }

  }

  cancel(row) {
    row.edit = !row.edit;
    this.mhd = "";
  }
}
