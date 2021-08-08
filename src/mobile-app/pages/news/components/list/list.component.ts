import {Component, OnInit, Input, OnChanges, EventEmitter, Output, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ListCreator, User} from './list.model';
import {NewsService} from '../../../../../services/news/news.service';
import {MatDialog, MatTableDataSource, MatPaginator, MatSort, Sort} from '@angular/material';
import {CrudComponent} from '../crud/crud.component';
import {ContentComponent} from '../content/content.component';
import {SocketService} from '../../../../../services/socket/socket.service';
import {UsersService} from '../../../../../services/users/users.service';
import {Router} from '@angular/router';
import {CrudCreator} from '../crud/crud.model';
import {SelectionModel} from '@angular/cdk/collections';
import {AccessibleService} from 'src/services/accessible/accessible.service';


@Component({
  selector: 'mobile-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  crudCreator: CrudCreator;
  @Input() mailBoxList;
  @Input() type;
  @Input() columns;
  activeUserId;
  User: User[];
  temp;
  userInfo;
  dataSource;
  displayedColumns;
  selection = new SelectionModel<any>(true, [])

  constructor(private newsService: NewsService,
              private myRoute: Router,
              private usersService: UsersService,
              private dialog: MatDialog,
              private accessibleService: AccessibleService) {
  }

  ngOnInit() {
    this.crudCreator = {} as CrudCreator;
    this.paginator._intl.itemsPerPageLabel = 'تعداد خبر در صفحه';
    this.paginator._intl.nextPageLabel = 'بعدی';
    this.paginator._intl.previousPageLabel = 'قبلی';
    this.paginator._intl.getRangeLabel = function (page, pageSize, length) {

      return "";
    }
    this.activeUserId = this.usersService.getUserInfo().id;
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.displayedColumns.splice(0, 0, 'select');
    this.dataSource = new MatTableDataSource(this.mailBoxList);
    this.dataSource.paginator = this.paginator;
    this.userInfo = this.usersService.getUserInfo();
    this.getNewsFilters('sourceNews');
    this.getNewsFilters('importantNews');
    this.getNewsFilters('newsTruth');
    this.getNewsFilters('urgentNews');
    this.getNewsFilters('archiveNews');
    if (this.dataSource)
      this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    let temp = this.mailBoxList.slice();
    let item;
    console.log(temp)
    this.columns.forEach((i) => {
      if(i.columnDef === sort.active){
        item = i;
      }
    });
    this.dataSource.data = temp.sort((a, b) => {
      const isA = sort.direction === 'asc';
      return this.compare(item.cell(a), item.cell(b), isA);
    });
  }

  compare(a, b, isA) {
    return (a < b ? -1 : 1) * (isA ? 1 : -1);
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

  deleteSelectedNews() {
    if (this.selection.selected.length > 0) {
      this.accessibleService.showConfirm().subscribe(
        (data => {
          if (data == 1) {
            this.selection.selected.forEach(row => {
              if (this.type == "drafts") {
                this.splice(row.id)
                this.dataSource.data = this.mailBoxList;
                this.newsService.setMailbox(this.dataSource.data, 'draft');
              }
              else {
                //delete from server
                this.newsService.deleteList(row.id, this.type).subscribe(
                  (data) => {
                    this.splice(row.id)
                    this.dataSource.data = this.mailBoxList;
                  },
                  (error) => {
                    console.log('حذف انجام نشد')
                  }
                )
              }

              this.selection.clear();
            })
          }
        })
      )
    }

  }

  public splice(id) {
    for (let i = this.dataSource.data.length - 1; i >= 0; i--) {
      if (id == this.dataSource.data[i].id) {
        this.dataSource.data.splice(i, 1);
        this.paginator._changePageSize(this.paginator.pageSize);
        //delete from local storage
        this.newsService.deleteLocalList(this.dataSource.data, this.type)
      }
    }
  }

  private getNewsFilters(label) {

    this.crudCreator[label] = this.newsService.getOfflineSources(label);
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.mailBoxList;
      this.dataSource.paginator = this.paginator;
    }
    //this.paginator._changePageSize(this.paginator.pageSize);
  }

  applyFilter(label, id) {
    this.dataSource.filterPredicate = (row, filter) => {
      if (filter == 'all')
        return true;
      return row[label].id == filter;
    }
    this.dataSource.filter = id;
  }

  applySearch(value) {
    // this.dataSource.filterPredicate = (row, filter) => {
    //   if (row['subject'].trim().toLowerCase().indexOf(filter) >= 0 ||
    //     row['text'].trim().toLowerCase().indexOf(filter) >= 0 ||
    //     row['sender'].lastname.trim().toLowerCase().indexOf(filter) >= 0 ||
    //     row['sender'].firstname.trim().toLowerCase().indexOf(filter) >= 0)
    //     return true;
    //   return false;
    //
    // }


    // let values = value.split(" ");
    // values.forEach(
    // (val) => {
    // this.dataSource.filter = val.trim().toLowerCase();
    // }
    // )
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.filterPredicate = (row, filter) => {
      if (JSON.stringify(row).indexOf(filter) >= 0)
        return true;
      return false;
    }

  }

  showContent(row) {
    if (this.type === 'drafts') {
      this.myRoute.navigate(['news/compose', row.id]);
    } else {
      if (this.type == "inbox" && !row['seen_time']) {
        // ;
        this.newsService.seen(row.id).subscribe(
          (data) => {
            row['seen_time'] = data['seen_time'];
            this.newsService.setMailbox(this.dataSource.data, 'inbox');
          }
        )
      }
      const dialogRef = this.dialog.open(ContentComponent, {
        data: {
          newsData: row,
          type: this.type
        },
        width: "50%"
      })
      dialogRef.afterClosed().subscribe(
        (data) => {
          if (data) {
            row = data;
          }
        }
      )
    }

  }
}
