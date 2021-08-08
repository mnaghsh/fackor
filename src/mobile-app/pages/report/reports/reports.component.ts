import {Component, OnInit, ViewChild, OnChanges} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, Sort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ReportsService} from '../../../../services/reports/reports.service';
import {LocalStorageService} from '../../../../services/local-storage/local-storage.service';
import {CommonService} from '../../../../services/common/common.service';
import {UsersService} from '../../../../services/users/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'q';
import {Observable, Subject} from 'rxjs';
import {ContentComponent} from 'src/mobile-app/pages/report/component/content/content.component';
import {ConfirmDialogComponent} from '../../../../components/confirm-dialog/confirm-dialog.component';
import {AccessibleService} from '../../../../services/accessible/accessible.service';
import {JalaliPipe} from "../../../../web-app/pipes/jalali.pipe";

@Component({
  selector: 'mobile-app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnChanges {
  nameOfReport: any;
  temp;
  forms;
  confirmOfDelete: number;
  inputId;
  showTable = false;
  translateForms;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  columns: any;

  constructor(private route: ActivatedRoute,
              private myRoute: Router,
              private reportsService: ReportsService,
              private commonService: CommonService,
              public userService: UsersService,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog,
              private accessibleService: AccessibleService,
              private jalaliPipe: JalaliPipe
  ) {

  }

  ngOnChanges() {
  }

  ngOnInit() {

    this.route.params.subscribe(
      data => {

        if (data.id) {
          this.inputId = data.id
          this.findNameOfReport();
          this.setColumns();
          let mhd = this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', this.inputId);
          this.reportHistory().subscribe(
            (data) => {
              const form = this.reportsService.getFormOrderById(this.inputId);
              this.setTranslateForms(form);
              this.setDataSource();
            }
          );
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

  sortData(sort: Sort) {
    let temp = this.forms.slice();
    console.log(temp);
    console.log(this.forms);

    let item;
    this.columns.forEach((i) => {
      if(i.columnDef === sort.active){
        item = i;
      }
    });
    this.dataSource.sort = temp.sort((a, b) => {
      const isA = sort.direction === 'asc';
      return this.compare(item.cell(a), item.cell(b), isA);
    });
  }

  compare(a, b, isA) {
    return (a < b ? -1 : 1) * (isA ? 1 : -1);
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

  private newForm() {

    this.myRoute.navigate(['report/new-form/', this.inputId]);
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

  public reportHistory(): Observable<any> {
    let sub = new Subject<any>();
    this.reportsService.inboxReportUrl(this.inputId).subscribe(
      (data) => {
        this.forms = data;
        this.userService.setRowOfReportToLocalStorageGroupByUser(data, 'reportRowList', this.inputId);
        console.log('online', this.forms);
        sub.next();

      },
      (error) => {
        this.forms = this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', this.inputId);

        console.log('offline', this.forms);
        sub.next();
      });
    return sub;
  }

  private showContent(row) {
    console.log('rr', row)
    const dialogRef = this.dialog.open(ContentComponent, {
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

  outboxReports() {

    this.myRoute.navigate(['report/sent-reports/', this.inputId]);
  }

  deleteSelectedNews() {
    if (this.selection.selected.length > 0) {
      this.accessibleService.showConfirm().subscribe(
        (data => {
          if (data == 1) {
            this.selection.selected.forEach(row => {
              //delete from server
              this.reportsService.deleteList(row.id).subscribe(
                (data) => {
                  for (let i = this.dataSource.data.length - 1; i >= 0; i--) {
                    if (row.id == this.dataSource.data[i].id) {
                      this.dataSource.data.splice(i, 1);
                      this.paginator._changePageSize(this.paginator.pageSize);
                      //delete from local storage
                      this.reportsService.deleteLocalList(this.dataSource.data, 'reportRowList')
                    }
                  }
                  this.selection.clear();
                },
                (error) => {
                  console.log('حذف انجام نشد')
                }
              )
            })
          }
        })
      );


    }
  }


}
