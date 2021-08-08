import {Injectable} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigStyleService {
  showNavBar = new Subject<any>();
  navBarStatus = true;

  constructor(private myRout: Router) {
    this.toggleShowNavBarBtn();
  }

  toggleShowNavBarBtn() {
    this.myRout.events.subscribe(
      (event) => {
        if (this.myRout.url !== '/calk' && this.myRout.url !== '/tracking') {
          if (!this.navBarStatus)
            this.showNavBar.next();
        }
      }
    );
  }
}
