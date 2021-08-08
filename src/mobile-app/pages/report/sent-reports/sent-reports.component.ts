import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {UsersService} from '../../../../services/users/users.service';
import {ReportsService} from '../../../../services/reports/reports.service';
import {CommonService} from '../../../../services/common/common.service';
import {LocalStorageService} from '../../../../services/local-storage/local-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ContentComponent} from 'src/mobile-app/pages/report/component/content/content.component';
import {ConfirmDialogComponent} from 'src/components/confirm-dialog/confirm-dialog.component';
import {AccessibleService} from '../../../../services/accessible/accessible.service';
import {JalaliPipe} from "../../../../web-app/pipes/jalali.pipe";


@Component({
  selector: 'mobile-app-sent-reports',
  templateUrl: './sent-reports.component.html',
  styleUrls: ['./sent-reports.component.css']
})
export class SentReportsComponent implements OnInit {
  confirmOfDelete: number;
  nameOfReport: any;
  temp;
  inputId;
  translateForms;
  displayedColumns: string[] = ['select', 'id', 'name', 'date', 'details'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  forms = [];
  columns = [];

  constructor(private route: ActivatedRoute,
              private reportsService: ReportsService,
              private myRoute: Router,
              private commonService: CommonService,
              public userService: UsersService,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog,
              private accessibleService: AccessibleService,
              private jalaliPipe: JalaliPipe
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      data => {
        if (data.id) {
          this.inputId = data.id
          this.findNameOfReport();
          this.setColumns();
          this.reportHistory();
          const form = this.reportsService.getFormOrderById(this.inputId);
          this.setTranslateForms(form);
          this.setDataSource();
        }
      }
    );
  }

  setColumns() {
    this.columns = [
      {
        columnDef: 'id',
        label: 'ردیف',
        cell: (row, index) => {
          return index + 1;
        }
      },
      {
        columnDef: 'name',
        label: 'نام',
        cell: (row) => {
          return this.getPosition(row.creator.firstname + ' ' + row.creator.lastname, row.creator.id);
        }
      },
      {
        columnDef: 'date',
        label: 'تاریخ',
        cell: (row) => {
          return this.jalaliPipe.transform(row.date);
        }
      }
      // },
      // {
      //   columnDef: 'details',
      //   label: 'جزئیات',
      //   cell: (row) => "<h3>...</h3>"
      // }
    ];
    this.displayedColumns = ['select', 'id', 'name', 'date'];
    this.dataSource = null;
    this.forms = null;
  }

  getPosition(name, id) {
    return name + this.userService.getUserPosition(id);
  }

  setDataSource() {
    let x = true;
    this.forms.forEach(
      (data) => {
        data['value'] = JSON.parse(data['value'].replace(/'/g, "\""));
        data['value'].forEach(
          (pro) => {
            if (pro.show) {
              data['label_' + pro.name] = pro.label;
              data['value_' + pro.name] = pro.value;
              if (x) {
                this.displayedColumns.push('label_' + pro.name);
                this.columns.push({
                  columnDef: 'label_' + pro.name,
                  label: pro.label,
                  cell: (row) => row['value_' + pro.name]
                });
              }
            }
          });
        x = false;
      }
    )
    this.dataSource = new MatTableDataSource(this.forms);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setTranslateForms(forms) {
    this.translateForms = JSON.parse(forms.value.replace(/'/g, "\""));
  }

  private findNameOfReport() {
    let mhd = this.userService.getFromLocalStorageGroupByUser('reportForms')

    for (let i = 0; i < mhd.length; i++) {
      if (mhd[i].id == this.inputId)
        this.nameOfReport = mhd[i].name;
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
      if (JSON.stringify(row).indexOf(filter) >= 0)
        return true;
      return false;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSelectedNews() {
    if (this.selection.selected.length > 0) {
      this.accessibleService.showConfirm().subscribe(
        (data => {
          if (data == 1) {
            let mhd = this.userService.getFromLocalStorageGroupByUser("sentReportRowList")
            for (let j = 0; j < this.selection.selected.length; j++) {
              let row = this.selection.selected[j];
              for (let i = this.dataSource.data.length - 1; i >= 0; i--) {
                if (row.id == this.dataSource.data[i].id) {
                  this.dataSource.data.splice(i, 1);
                  this.paginator._changePageSize(this.paginator.pageSize);
                }
              }
              for (let i = mhd.length - 1; i >= 0; i--) {
                if (mhd[i].id == this.selection.selected[j].id) {
                  mhd.splice(i, 1);
                }
              }
            }
            this.reportsService.deleteLocalList(mhd, "sentReportRowList");
            this.selection.clear();
          }

        })
      )
    }
  }

  private showConfirm(): Observable<any> {
    let sub = new Subject<any>();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        Dialog: "حذف انجام شود؟",
        type: "reports"
      },
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data == 1) {
          this.confirmOfDelete = 1;
          sub.next();
        }
      }
    );
    return sub;
  }

  private newForm() {

    this.myRoute.navigate(['report/new-form/', this.inputId]);
  }

  public reportHistory(): Observable<any> {
    let sub = new Subject<any>();
    let mhd = this.userService.getFromLocalStorageGroupByUser('sentReportRowList')
    if (!mhd)
      mhd = [];
    this.forms = [];
    for (let i = 0; i < mhd.length; i++) {
      if (mhd[i].forms.id == this.inputId) {
        //  this.forms=mhd[i];وو
        this.forms.splice(0, 0, mhd[i]);
      }
    }
    sub.next();
    return sub;
  }

  private showContent(row) {
    console.log(row)
    const dialogRef = this.dialog.open(ContentComponent, {

      data: {
        reportData: row,
        type: "sent-reports"
      },
      width: "90%",
      height: "80%"
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
        }
      }
    )
  }
}
