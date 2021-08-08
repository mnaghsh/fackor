import {Injectable} from '@angular/core';
import {User} from '../../web-app/models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  username: string;
  password: string;
  firstname: string;
  lastname: string;

  constructor() {
  }

  public get(key: string): string {
    return localStorage.getItem(key);
  }

  public getJson(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public setJson(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

}
