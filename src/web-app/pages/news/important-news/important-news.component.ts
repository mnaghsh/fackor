import {Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../../../../services/news/news.service';
import {DataService} from '../../../services/data/data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

export interface Record extends ArrayBuffer {

  id?: number;
  name: string;
  edit;

}

@Component({
  selector: 'mobile-app-important-news',
  templateUrl: './important-news.component.html',
  styleUrls: ['./important-news.component.css']
})
export class ImportantNewsComponent implements OnInit {
  mhd;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])

  displayedColumns = ['number', 'name', 'update'];
  importantNews: any;

  constructor(private dataService: DataService) {
    this.dataService.getImportantNews().subscribe(
      (data) => {
        this.importantNews = data;
        this.importantNews = data;
        this.dataSource = new MatTableDataSource(this.importantNews);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data)
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.importantNews = {} as Record;
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
      // debugger;
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

  private addMission() {


    if (this.importantNews.name != null) {
      let mhd = Object.assign({}, this.importantNews)
      this.dataService.putImportantNews(this.importantNews.name).subscribe(
        (data) => {
          this.dataSource.data.unshift(mhd);
          this.paginator._changePageSize(this.paginator.pageSize);
          this.importantNews.name = null;
        },
        (error) => {
          this.mhd = error.error.text;
        }
      );
      this.mhd = "";
    }
    else {
      this.mhd = "برای افزودن ماموریت باید همه مقادیر را تکمیل کنید";
    }
  }

  private editMission(e) {

    console.log('this.userModel', e)
    if (e.name != null && e.id != null) {
      this.importantNews.id = e.id;
      this.importantNews.name = e.name;
      this.dataService.editImportantNews(this.importantNews.id, this.importantNews.name).subscribe(
        (data) => {
          this.paginator._changePageSize(this.paginator.pageSize);
          this.importantNews.name = null;
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

  rename(row) {
    row.edit = !row.edit
    if (row.edit == false) {
      this.editMission(row);
    }
  }

  cancel(row) {
    row.edit = !row.edit
    this.mhd = ""
  }

}
