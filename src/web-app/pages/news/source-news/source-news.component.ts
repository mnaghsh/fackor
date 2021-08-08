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
  selector: 'mobile-app-source-news',
  templateUrl: './source-news.component.html',
  styleUrls: ['./source-news.component.css']
})

export class SourceNewsComponent implements OnInit {
  mhd;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])

  displayedColumns = ['number', 'name', 'update'];
  sourceNews: any;

  constructor(private dataService: DataService) {
    this.dataService.getSourceNews().subscribe(
      (data) => {

        this.sourceNews = data;
        this.dataSource = new MatTableDataSource(this.sourceNews);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      });
  }


  ngOnInit() {
    this.sourceNews = {} as Record;
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

  private addMission() {


    if (this.sourceNews.name != null) {
      console.log(this.sourceNews, 'this.sourceNews')
      let mhd = Object.assign({}, this.sourceNews)
      this.dataService.putSourceNews(this.sourceNews.name).subscribe(
        (data) => {
          
          this.dataSource.data.unshift(mhd);
          this.paginator._changePageSize(this.paginator.pageSize);
          this.sourceNews.name = null;
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
    if (e.name != null && e.id != null) {
      this.sourceNews.id = e.id;
      this.sourceNews.name = e.name;
      console.log('model for edit', this.sourceNews)
      
      this.dataService.editSourceNews(this.sourceNews.id, this.sourceNews.name).subscribe(
        (data) => {
          this.paginator._changePageSize(this.paginator.pageSize);
          this.sourceNews.name = null;
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
