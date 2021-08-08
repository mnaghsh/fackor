import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ConfigService {

  public localVariables = {
    baseUrl: 'http://192.168.1.7:8080/Fackur'
  }
  constructor(public http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get(this.localVariables.baseUrl + url, options);
  }
  public delete(url: string, options?: any) {
    return this.http.delete(this.localVariables.baseUrl + url, options);
  }
  public post(url: string, body, options?: any) {
    return this.http.post(this.localVariables.baseUrl + url, body, options);
  }

  public put(url: string, body, options?: any) {
    return this.http.put(this.localVariables.baseUrl + url, body, options);
  }
}
