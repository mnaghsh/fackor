import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../../services/data/data.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

export interface Record extends ArrayBuffer {
  id?: number;
  name: string;
  edit;
}

@Component({
  selector: 'mobile-app-archive-news',
  templateUrl: './archive-news.component.html',
  styleUrls: ['./archive-news.component.css']
})
export class ArchiveNewsComponent implements OnInit {
  displayedColumns = ['number', 'name', 'update'];
  archiveNews: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mhd: any;

  constructor(private dataService: DataService) {
    this.dataService.getArchiveNews().subscribe(
      (data) => {
        this.archiveNews = data;
        this.dataSource = new MatTableDataSource(this.archiveNews);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data)
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.archiveNews = {} as Record;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (row, filter) => {
      if (row.name.indexOf(filter) >= 0) {

        return true;
      }
      return false;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private addArchive() {
    if (this.archiveNews.name != null) {
      let mhd = Object.assign({}, this.archiveNews)
      this.dataService.putArchiveNews(this.archiveNews.name).subscribe(
        (data) => {
          this.dataSource.data.unshift(mhd);
          this.paginator._changePageSize(this.paginator.pageSize);
          this.archiveNews.name = null;
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

  rename(row) {
    row.edit = !row.edit
    if (row.edit == false) {
      this.editMission(row);
    }
  }

  cancel(row) {
    row.edit = !row.edit
    this.mhd = "";
  }

  private editMission(e) {
    if (e.name != null && e.id != null) {
      this.archiveNews.id = e.id;
      this.archiveNews.name = e.name;
      this.dataService.newsFieldEdit('archiveNewsEdit', this.archiveNews.id, this.archiveNews.name).subscribe(
        (data) => {
          this.paginator._changePageSize(this.paginator.pageSize);
          this.archiveNews.name = null;
        }
        ,
        (error) => {
          this.mhd = error.error.text;
        }
      );
      this.mhd = "";
    }
    else {
      this.mhd = "برای ویرایش ماموریت باید همه مقادیر را تکمیل کنید";
    }

  }


}
