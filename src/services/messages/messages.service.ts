import {Injectable} from '@angular/core';
import {ConfigService} from "../config.service";
import {UsersService} from "../users/users.service";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {SocketService} from "../socket/socket.service";
import {Subject} from "rxjs/index";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  newMessages = [];
  newMessagesEvent;
  resetNewMessageNumberEvent;
  contacts: Array<{
    id?: string, userId: string, message: string, dir: string, class: string, color: string, checked?: boolean,
    seenTime?: any, sendTime?: any, receiveTime?: any, type: string, url?: string, serverTime?: any
  }> = [];

  constructor(private configService: ConfigService,
              private usersService: UsersService,
              private localStorage: LocalStorageService,
              private socket: SocketService) {
  }

  public getOldMessages(): any {
    return this.localStorage.getJson('oldMessages');
  }

  public initMessagesEvent() {
    this.newMessagesEvent = new Subject<any>();
    this.resetNewMessageNumberEvent = new Subject();
  }

  public completeMessagesEvent() {
    this.newMessagesEvent.complete();
    this.resetNewMessageNumberEvent.complete();
  }

  public uploadFile(file) {
    return this.configService.post('/message/fileinputload', file,
      {withCredentials: true});

  }

  public downloadFileURL(fileName) {
    return this.configService.localVariables.baseUrl + '/message/download/' + fileName;
  }

  public downloadFile(fileName) {
    let options = {
      responseType: 'text',
      withCredentials: true
    }
    return this.configService.get('/message/download/' + fileName, options
    );
  }

  public getDidNotSeenMessages(userId) {
    return this.configService.get('/message/currentusermessages/' + userId
      , {withCredentials: true});
  }

  public getAllMessagesOfContact(userId) {
    return this.configService.get('/message/usermessages/' + userId
      , {withCredentials: true});
  }

  public putMessage(body) {
    return this.configService.post('/message', body,
      {withCredentials: true});
  }

  public deleteMessage(id) {
    return this.configService.get('/message/' + id + '/deleted',
      {withCredentials: true});
  }

  public setOldMessages(contactId, messages) {
    let currentUserId: string = this.usersService.getUserInfo().id;
    let oldMessages = this.getOldMessages();
    if (!oldMessages) {
      oldMessages = [];
    }
    let isExist = false;
    for (let i = 0; i < oldMessages.length; i++) {
      if (oldMessages[i].userId === currentUserId
        && oldMessages[i].contactId === contactId) {
        oldMessages[i].contactId = contactId;
        oldMessages[i].messages = messages;
        isExist = true;
      }
    }
    if (!isExist) {
      oldMessages.push({
        'userId': currentUserId,
        'contactId': contactId,
        'messages': messages
      });
    }
    this.localStorage.set('oldMessages', JSON.stringify(oldMessages));
  }

  public getMessagesOfUserOffline(userId) {
    let currentUserId = this.usersService.getUserInfo().id;
    let oldMessages = this.getOldMessages();
    if (oldMessages) {
      for (let i = 0; i < oldMessages.length; i++) {
        if (oldMessages[i].userId === currentUserId
          && oldMessages[i].contactId === userId) {
          return oldMessages[i].messages;
        }
      }
    }
    return null;
  }

  public getDidNotSendMessages() {
    let offlineMessages: Array<Object> = [];
    let oldMessages: Array<Object> = this.getOldMessages();
    if (oldMessages) {
      oldMessages.forEach(
        (messagesOfUser) => {
          messagesOfUser['messages'].forEach(
            (message) => {
              if (message['serverTime'] == null) {
                offlineMessages.push(message);
              }
            }
          );
        }
      );
    }
    return offlineMessages;
  }

  public setDidNotSendMessages(item, data) {
    let oldMessages: Array<Object> = this.getOldMessages();
    if (oldMessages) {
      oldMessages.forEach(
        (messagesOfUser) => {
          messagesOfUser['messages'].forEach(
            (message) => {
              if (message['sendTime'] == item.sendTime) {
                message['serverTime'] = data['server_time'];
              }
            });
        }
      );
      this.contacts.forEach(
        (message) => {
          if (message['sendTime'] == item.sendTime) {
            message['serverTime'] = data['server_time'];
          }
        });
      this.localStorage.set('oldMessages', JSON.stringify(oldMessages));
    }
  }

  public sendOfflineMessages() {
    let offlineMessages = this.getDidNotSendMessages();
    if (offlineMessages) {
      offlineMessages.forEach(
        (message) => {
          this.send(message);
        }
      );
    }
  }

  send(item) {
    let body = {
      "text": item.message,
      "mission": {
        "id": 297
      },
      "receiver": {
        "id": item.userId
      },
      "sender_time": item.sendTime,
      "type": "text"
    };
    this.putMessage(body).subscribe(
      (data) => {
        this.socket.sendMessage(item.userId, item.message, "text");
        this.setDidNotSendMessages(item, data);
      }
    );
  }

  public getNewMessages() {
    const url = '/message/allusermessages';
    return this.configService.get(url, {withCredentials: true});
  }

  public setNewMessages() {
    this.getNewMessages().subscribe(
      (data) => {
        this.setSortNewMessages(this.sortNewMessages(data));
        this.newMessagesEvent.next();
      }
    );
  }

  public getSortNewMessages() {
    return this.newMessages;
  }

  public setSortNewMessages(messages) {
    this.newMessages = messages;
  }

  addNumberOfNewMessages(userId, message) {
    // if (this.newMessages.length > 0) {
    //
    //   this.newMessages.forEach(
    //     (userMessages) => {
    //       if (userMessages.userId == userId) {
    //         userMessages.messages.push({text: message});
    //       }
    //     }
    //   );
    // } else {
    //   const sortMessage = {
    //     userId: userId,
    //     user: ' ',
    //     messages: [
    //       {text: message}
    //     ]
    //   };
    //   this.newMessages.push(sortMessage);
    // }
    //
    // console.log(this.newMessages);
    this.putReceiveTime(userId);
  }

  public sortNewMessages(messages) {
    let sortMessages: Array<{ userId: number, user: string, messages: Array<Object> }> = [];
    let sortMessage: any;
    if (messages) {
      messages.forEach(
        (message) => {
          if (sortMessage = this.userExist(message.sender.id, sortMessages)) {
            sortMessages[sortMessage - 1].messages.push(message);
          } else {
            sortMessage = {
              userId: message.sender.id,
              user: message.sender.firstname + ' ' + message.sender.lastname,
              messages: [
                message
              ]
            };
            sortMessages.push(sortMessage);
          }
        }
      );
    }
    return sortMessages;
  }

  private userExist(id, sortMessages) {
    let exist;
    if (sortMessages) {
      sortMessages.forEach(
        (sortMessage, index) => {
          if (sortMessage.userId == id) {
            exist = index + 1;
          }
        }
      );
    }
    return exist;
  }

  public putSeenDate(userId) {
    +new Date;
    const url = `/messages/seenupdate/${userId}`;
    this.resetNewMessageNumberEvent.next(userId);
    return this.configService.get(url, {withCredentials: true}).subscribe(
      () => {
        this.socket.sendMessage(userId, Date.now(), 'seen');
      }
    );
  }

  public updateMessages(userId, data) {
    this.contacts.forEach(
      (message) => {
        if (data[3] === 'seen')
          message.seenTime = data[2];
        if (data[3] === 'receive')
          message.receiveTime = data[2];
      }
    );
    this.setOldMessages(userId, this.contacts);
  }

  public putReceiveTime(senderId, date?) {
    +new Date
    const url = `/message/receivertimeupdate/${senderId}`;
    return this.configService.get(url, {withCredentials: true}).subscribe(
      () => {
        this.socket.sendMessage(senderId, Date.now(), 'receive');
      }
    );
  }


}
