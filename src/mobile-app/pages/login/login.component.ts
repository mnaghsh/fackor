import { ConfigService } from 'src/services/config.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mobile-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "mhd"
  password = "1"

  constructor(private configService: ConfigService,
    private authService: AuthService,
     private myRoute: Router,) { }

  ngOnInit() {
    // debugger
    this.configService.get("users").subscribe(
      (data: any) => {
        data.forEach(element => {

          if (element.userName == this.username && element.password == this.password)
          // debugger
          this.myRoute.navigate(['']);
        });
      }
    )
  }

}
