import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { DataService } from '../../../services/data/data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
export interface Record extends ArrayBuffer {

  id?: number;
  name: string;
  edit;

}
@Component({
  selector: 'mobile-app-truth-news',
  templateUrl: './truth-news.component.html',
  styleUrls: ['./truth-news.component.css']
})
export class TruthNewsComponent implements OnInit {
  mhd;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, [])

  displayedColumns = ['number', 'name', 'update'];
  truthNews: any;
  constructor(private dataService: DataService) {
    this.dataService.getTruthNews().subscribe(
      (data) => {

        this.truthNews = data;
        this.dataSource = new MatTableDataSource(this.truthNews);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data)
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.truthNews = {} as Record;
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


    if (this.truthNews.name != null) {
      console.log(this.truthNews, 'this.truthNews')
      let mhd = Object.assign({}, this.truthNews)
      this.dataService.putTruthNews(this.truthNews.name).subscribe(
        (data) => {
          
          this.dataSource.data.unshift(mhd);
          this.paginator._changePageSize(this.paginator.pageSize);
          this.truthNews.name = null;
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

    console.log('this.userModel', e)
    if (e.name != null && e.id != null) {
      this.truthNews.id = e.id;
      this.truthNews.name = e.name;
      console.log('model for edit', this.truthNews)
      
      this.dataService.editTruthNews(this.truthNews.id, this.truthNews.name).subscribe(
        (data) => {
          this.paginator._changePageSize(this.paginator.pageSize);
          this.truthNews.name = null;
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
