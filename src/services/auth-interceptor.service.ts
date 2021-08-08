import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService) { }
  private gettingRefreshToken = false;
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl('/login');
      return EMPTY;
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentDate: any = new Date();
    let expireDate: any = new Date(this.getCookie('expires_in'));
    let timeToExpireToken = expireDate - currentDate;
    let token = this.getCookie('access_token');

    if (token) {
      if (timeToExpireToken < 60000 && !this.gettingRefreshToken) { ///token expire in 60 sec, call refresh token
        this.gettingRefreshToken = true;
        this.auth.refreshToken().subscribe(
          (res) => {
            this.setAuthToken(res);
            this.gettingRefreshToken = false;
          }
        )
      }
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }


    return next.handle(req).pipe(catchError((err, caught) => {
      this.handleAuthError(err);
      return of(err);
    }) as any);
  }

  public setAuthToken(tokens){
    let expire_date = new Date();
    expire_date.setTime(expire_date.getTime() + tokens['expires_in'] * 1000);
    this.setCookie('access_token', tokens['access_token'], expire_date.toUTCString())
    this.setCookie('expires_in', expire_date, "Fri, 3 Aug 2099 20:47:11 UTC");
  }
  public setCookie(name, value, expire_date) {
    document.cookie = name + "=" + value + ";expires=" + expire_date + "; path=/";
  }
  public getCookie(name): any {
    let value = '; ' + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
    return null;
  }
}
