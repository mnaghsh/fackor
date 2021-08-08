import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  socketUrl = 'localhost:50030/api/'
  public localVariables = {

    socketUrl: this.socketUrl,
    baseUrl: 'http://' + this.socketUrl,

  }
  //text editor toolbar config
  public textEditorModule = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{'header': 1}, {'header': 2}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'direction': 'ltr'}],
      [{'size': ['small', false, 'large', 'huge']}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],
      ['clean'],
    ]
  }

  public messages = {
    persian: {
      disconnected: 'ارتباط شما با سرور متصل نمی باشد.',
    }
  }


  constructor(public http: HttpClient) {
  }

  public get(url: string, options?: any) {
    return this.http.get<any[]>(this.localVariables.baseUrl + url, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete<any[]>(this.localVariables.baseUrl + url, options);
  }

  public post(url: string, body, options?: any) {
    return this.http.post(this.localVariables.baseUrl + url, body, options);
  }

  public put(url: string, body, options?: any) {
    return this.http.put(this.localVariables.baseUrl + url, body, options);
  }

}
