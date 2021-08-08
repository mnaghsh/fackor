import {Component, OnInit} from '@angular/core';
import { ConfigService } from '../../../../services/config.service';


@Component({
  selector: 'mobile-app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // action = Action;
  // user: User;
  // messages: Message[] = [];
  // messageContent: string;
  // ioConnection: any;

  constructor(
    private configService:ConfigService
  ) {
  }

  ngOnInit() {

    // this.initIoConnection();
  }

  // private initIoConnection(): void {
  //   this.soccketService.initSocket();
  //
  //   this.ioConnection = this.soccketService.onMessage()
  //     .subscribe((message: Message) => {
  //       this.messages.push(message);
  //     });
  //
  //   this.soccketService.onEvent(Event.CONNECT)
  //     .subscribe(() => {
  //       console.log('connected');
  //     });
  //
  //   this.soccketService.onEvent(Event.DISCONNECT)
  //     .subscribe(() => {
  //       console.log('disconnected');
  //     });
  // }
  //
  // public sendMessage(message: string): void {
  //   if (!message) {
  //     return;
  //   }
  //
  //   this.soccketService.send({
  //     from: this.user,
  //     content: message
  //   });
  //   this.messageContent = null;
  // }
  //
  // public sendNotification(params: any, action: Action): void {
  //   let message: Message;
  //
  //   if (action === Action.JOINED) {
  //     message = {
  //       from: this.user,
  //       action: action
  //     };
  //   } else if (action === Action.RENAME) {
  //     message = {
  //       action: action,
  //       content: {
  //         username: this.user.name,
  //         previousUsername: params.previousUsername
  //       }
  //     };
  //   }
  //
  //   this.soccketService.send(message);
  // }

  public webSocket;
  public messages;


  openSocket() {
    // Ensures only one connection is open at a time
    if (this.webSocket !== undefined && this.webSocket.readyState !== WebSocket.CLOSED) {
      console.log("WebSocket is already opened.");
      return;
    }
    // Create a new instance of the websocket
    // webSocket = new WebSocket("ws://192.168.1.116:8084/nakamessanger/echo");

    this.webSocket = new WebSocket("ws://"+this.configService.socketUrl+"/echo");

    /**
     * Binds functions to the listeners for the websocket.
     */
    this.webSocket.onopen = function (event) {
      // For reasons I can't determine, onopen gets called twice
      // and the first time event.data is undefined.
      // Leave a comment if you know the answer.
      if (event.data === undefined)
        return;

      this.writeResponse(event.data);
    };

    this.webSocket.onmessage = function (event) {
      this.writeResponse(event.data);
    };

    this.webSocket.onclose = function (event) {
      this.writeResponse("Connection closed");
    };
  }


  writeResponse(text) {
    this.messages = "<br/>" + text;
  }


  /**
   * Sends the value of the text input to the server
   */
  send() {
    let text = "awdawd";
    this.webSocket.send(text);
  }

  closeSocket() {
    this.webSocket.close();
  }

}
