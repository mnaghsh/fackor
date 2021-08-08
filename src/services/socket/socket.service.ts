import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { ConfigService } from '../config.service';
import { UsersService } from "../users/users.service";
import { MessagesService } from "../messages/messages.service";
import { NewsService } from '../news/news.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  webSocket;
  disableAutoSend = true;
  test;
  contacts: Array<{
    temp: number
  }> = [];
  public sendRequestToOpen = false;
  public socketEvent;
  public webSocketOpenEvent;
  public webSocketCloseSocket;
  webSocketStatus = {
    isOnline: false
  }
  autoSender = false;
  public onlineUsers = [];

  constructor(private configService: ConfigService,
    public newsService: NewsService,
    public usersService: UsersService) {
  }

  public initSocketEvent() {
    this.socketEvent = new Subject<any>();
    this.webSocketOpenEvent = new Subject<any>();
    this.webSocketCloseSocket = new Subject<any>();
  }

  public completeEvents() {
    this.webSocketOpenEvent.complete();
    this.webSocketCloseSocket.complete();
    this.socketEvent.complete();
  }

  public openSocket(userId) {
    if (this.webSocket !== undefined && this.webSocket.readyState !== WebSocket.CLOSED) {
      console.log("WebSocket is already opened.");
      return;
    }
    // Create a new instance of the websocket
    this.webSocket = new WebSocket('ws:' + this.configService.localVariables.socketUrl + '/echo?id=' +
      userId);
    let that = this;
    this.webSocket.onmessage = function (event) {
      that.socketEvent.next(event);
    };
    this.webSocket.onclose = function (event) {
      that.webSocketCloseSocket.next(event);
    };
    this.webSocket.onopen = function (event) {
      that.webSocketOpenEvent.next(event);
    };
  }

  public usersWatcher() {
    this.socketEvent.subscribe(
      (event) => {
    
        let x = event.data.split("|");
        if (x[3] && x[3].indexOf("news") >= 0)
          this.newsService.buildInbox();
        console.log(event.data);
        if (x[0] === "newUser") {
          this.initNewUsersOnline(x);
        }
        if (x[0] === "removeUser") {
          this.updateUsersOnline(x[1]);
        }
      }
    );
  }

  public initNewUsersOnline(data) {
    if (data.length > 2) {
      this.onlineUsers = [];
      data.forEach(
        (value) => {
          if (value !== 'newUser') {
            this.onlineUsers.push(value);
          }
        }
      );
    } else {
      let isExist = false;
      this.onlineUsers.forEach(
        (value) => {
          if (value == data[1]) {
            isExist = true;
          }
        }
      );
      if (!isExist) {
        this.onlineUsers.push(data[1]);
      }
    }

  }

  public updateUsersOnline(userId) {
    this.onlineUsers.forEach(
      (value, index) => {
        if (value == userId) {
          this.onlineUsers.splice(index, 1);
        }
      }
    );
  }


  public userIsOnline(id) {
    let isOnline = false;
    this.onlineUsers.forEach(
      (value) => {
        if (value == id) {
          isOnline = true;
        }
      }
    )
    if (isOnline) {
      return isOnline;
    }
  }

  sendMessage(userId, senderInput, type) {
    if (this.userIsOnline(userId)) {
      this.webSocket.send(userId + '|' + senderInput + '|' + type);
    }
  }

  sendNews(users, senderInput, type, importantNews) {
    // ;
    this.contacts = [];
    users.forEach(element => {
      if (this.userIsOnline(element.receiver.id)) {
        this.contacts.push(element.receiver.id);
      }
    });
    console.log(this.contacts + '|' + senderInput + '|' + type + '|' + importantNews)
    
    if (this.contacts.length > 0)
      this.webSocket.send(this.contacts + '|' + senderInput + '|' + type + '-' + importantNews);
  }

  sendFile(value) {
    this.webSocket.send(value);
  }

}
