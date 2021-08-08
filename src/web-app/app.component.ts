import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public auth: AuthService,
              private myRoute: Router) {
  }
}
