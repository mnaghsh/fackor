import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from 'src/services/news/news.service';
import {CommonService} from '../../../../services/common/common.service';

@Component({
  selector: 'mobile-app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, public commonService: CommonService, public newsService: NewsService) {
  }

  crudModel = null;

  ngOnInit() {
    console.log(this.crudModel)
    this.route.params.subscribe(
      data => {
        if (data.id) {
          this.crudModel = this.newsService.getNewsDraftById(data.id);
          console.log(this.crudModel)
        }
      }
    )
  }

  ngOnDestroy() {

  }

}
