import {
  AfterViewChecked,
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../services/config.service';
import {UsersService} from '../../services/users/users.service';
import {MessagesService} from "../../services/messages/messages.service";
import {SocketService} from '../../services/socket/socket.service';
import {HttpClient} from '@angular/common/http';
import {saveAs} from "file-saver";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {AccessibleService} from '../../services/accessible/accessible.service';
import {ContentComponent} from "../../mobile-app/pages/report/component/content/content.component";
import {MatDialog} from "@angular/material";
import {ImagePreviewComponent} from "../image-preview/image-preview.component";
import {IndexComponent} from "../../web-app/pages/users/index/index.component";
import {UserStatusService} from "../../services/user-status/user-status.service";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, AfterViewChecked, OnDestroy {
  activeSearch = false;
  activeUserInfo: any;
  socketEvent: any;
  senderInput = "";
  file: any;
  fileUrl: any;
  color: any;
  userId: string;
  userInfo: string;
  searchMessage: string = null;
  searchResults = null;
  searchArray = [];
  currentSearchItem;
  currentSearchIndex = 0;
  previousSearchItem;
  orgForFightUsers = [];
  lastSeen;
  lastReceive;
  downloadBaseUrl;
  scrollStatus = 0;
  command = false;

  constructor(private route: ActivatedRoute,
              private configService: ConfigService,
              private usersService: UsersService,
              private socket: SocketService,
              public messagesService: MessagesService,
              private accessibleService: AccessibleService,
              private dialog: MatDialog,
              private userStatusService: UserStatusService
  ) {
    this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/uploaded/';
  }


  ngOnInit() {
    this.orgForFightUsers = this.usersService.getOrgForFightUsers();
    this.activeUserInfo = this.usersService.getUserInfo();
    this.socketEvent = this.socket.socketEvent.subscribe(this.showOnlineMessage());
    this.route.params.subscribe(
      (data) => {
        this.userId = data['userId'];
        this.messagesService.contacts = [];
        this.getAllMessages();
        this.searchResults = null;
        this.searchMessage = null;
        this.getRecentActivity(this.userId);
        this.getUserInfo(this.userId);
        this.userStatusService.resetNumberOfNewMessages(data['userId']);
      }
    );
  }

  ngOnDestroy() {
    this.socketEvent.unsubscribe();
  }

  getUserInfo(userId) {
    this.userInfo = this.usersService.getOrgForFightById(userId);
  }

  showOnlineMessage() {
    return (event) => {
      let socketMessage = event.data.split("|");
      let receiver = socketMessage[1];
      if (socketMessage[0] === "message" && receiver === this.userId) {
        this.userStatusService.resetNumberOfNewMessages(Number(this.userId));
        if (socketMessage[3] === 'text' || socketMessage[3] === 'file') {
          this.getDidNotSeenMessages();
        } else if (socketMessage[3] === 'seen' || socketMessage[3] === 'receive') {
          this.messagesService.updateMessages(this.userId, socketMessage);
        }
      }
    };
  }

  showImagePreview(nameOfFile) {
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: {
        name: nameOfFile
      },
      width: "auto",
      height: "auto"
    });
  }

  download(nameOfFile) {
    let a = document.createElement("a");
    a.download = nameOfFile;
    a.href = this.messagesService.downloadFileURL(nameOfFile);
    a.click();
  }

  ngAfterViewChecked() {
    if (!this.activeSearch && this.scrollStatus == 1) {
      this.navigateScrollBar('end');
      this.scrollStatus = 0;
    }
  }

  deleteSelectedMessage() {
    if (this.hasSelected()) {
      this.accessibleService.showConfirm().subscribe(
        (data) => {
          if (data === 1) {
            for (let i = this.messagesService.contacts.length - 1; i >= 0; i--) {
              if (this.messagesService.contacts[i].checked) {
                let messageId = this.messagesService.contacts[i].id;
                this.messagesService.contacts.splice(i, 1);
                console.log(this.messagesService.contacts);
              }
            }
            this.messagesService.setOldMessages(this.userId, this.messagesService.contacts);
          }
        }
      );
    }
  }

  hasSelected() {
    for (let i = this.messagesService.contacts.length - 1; i >= 0; i--) {
      if (this.messagesService.contacts[i].checked) {
        return true;
      }
    }
  }

  send(type, message?) {
    +new Date 
    let body = {
      "text": message,
      "type": type,
      "mission": {
        "id": 297
      },
      "receiver": {
        "id": this.userId
      },
      "sender_time": Date.now(),
      "command": this.command
    }
    let sendMessageTemp = {
      userId: this.userId, message: message, dir: "rtl",
      class: "rightChips", color: "green", sendTime: Date.now(), serverTime: null, type: type,
      receiveTime: null, seenTime: null, id: "", command: this.command
    }
    if (message.length > 0) {
      this.messagesService.putMessage(body).subscribe((data) => {
          sendMessageTemp.serverTime = data['server_time'];
          sendMessageTemp.id = data['id'];
          //added
          sendMessageTemp.userId = data['id'];
          this.socket.sendMessage(this.userId, message, type);
          this.messagesService.contacts.push(sendMessageTemp);
          this.refresh();
        },
        (error) => {
          if (this.messagesService.contacts == null) {
            this.messagesService.contacts = [sendMessageTemp];
          } else {
            this.messagesService.contacts.push(sendMessageTemp);
          }
          this.refresh();
        });
    }
  }

  refresh() {
    this.cancelSearch();
    this.cleanSearchBar();
    this.messagesService.setOldMessages(this.userId, this.messagesService.contacts);
    this.senderInput = "";
    this.scrollStatus = 1;
    this.command = false;
  }

  getAllMessages() {
    if (this.messagesService.getMessagesOfUserOffline(this.userId)) {
      this.messagesService.contacts = this.messagesService.getMessagesOfUserOffline(this.userId);
    }
    this.scrollStatus = 1;
    this.getDidNotSeenMessages();
  }

  getDidNotSeenMessages() {
    this.messagesService.getDidNotSeenMessages(this.userId).subscribe(
      (data: any) => {
        //
        this.messagesService.putSeenDate(this.userId);
        this.showMessages(data);
        this.messagesService.setOldMessages(this.userId, this.messagesService.contacts);
      }
    );
  }

  showMessages(messages) {
    messages.forEach(element => {
      let temp = {
        userId: element.id, message: element.text, dir: "rtl", url: this.fileUrl,
        class: "rightChips", color: "green", type: element.type,
        receiveTime: element.receiver_time,
        seenTime: element.seen_time, serverTime: element.server_time,
        sendTime: element.sender_time, command: element.command
      }
      if (element.sender.id !== this.activeUserInfo.id) {
        temp.dir = "ltr", temp.class = "leftChips", temp.color = "dcf8c6";
      }
      this.messagesService.contacts.push(temp);
      this.scrollStatus = 1;
    });
  }

  getFileUrl(element) {
    return this.messagesService.downloadFileURL(element);
  }

  searchMessages() {
    this.cancelSearch();
    if (this.searchMessage !== '' || this.searchMessage !== undefined) {
      this.messagesService.contacts.forEach(
        (record) => {
          if (record.message && record.message.includes(this.searchMessage)) {
            this.searchArray.push(record);
          }
        }
      );
    }
    if (this.searchArray.length > this.currentSearchIndex) {
      this.currentSearchItem = this.searchArray[this.currentSearchIndex];
      this.previousSearchItem = this.currentSearchItem.class;
      this.currentSearchItem.class = 'focusChip';
      this.navigateScrollBar('message');
      this.activeSearch = true;
    }
  }

  changeSearchMessage(step) {
    if ((this.searchArray.length - 1) > this.currentSearchIndex && step === 'next') {
      this.currentSearchIndex++;
    } else if (this.currentSearchIndex > 0 && step === 'previous') {
      this.currentSearchIndex--;
    }
    this.changePreviousSearchClass();
    this.initSearchItem();
    this.navigateScrollBar('message');
  }

  cancelSearch() {
    if (this.searchArray.length > 0) {
      this.changePreviousSearchClass();
    }
    this.searchArray = [];
    this.currentSearchIndex = 0;
    this.navigateScrollBar('end');
  }

  changePreviousSearchClass() {
    this.currentSearchItem.class = this.previousSearchItem;
  }

  initSearchItem() {
    this.currentSearchItem = this.searchArray[this.currentSearchIndex];
    this.previousSearchItem = this.currentSearchItem.class;
    this.currentSearchItem.class = 'focusChip';
  }

  cleanSearchBar() {
    this.searchMessage = null;
    this.activeSearch = false;
  }

  navigateScrollBar(position) {
    let element = document.getElementById('target');
    if (position === 'end') {
      element.scrollTop = element.scrollHeight;
    } else if (position === 'message') {
      let ele = document.getElementById(this.currentSearchItem.userId);
      element.scrollTop = ele.offsetTop;
    }
  }

  fileChange(event) {
    //;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      //headers.append('Content-Type', 'multipart/form-data');
      //headers.append('Accept', 'application/json');
      this.messagesService.uploadFile(formData).subscribe(
        (res) => {
          console.log(res)
          this.send('file', res[0]);
          this.messagesService.contacts['type'] = res[0];
        }
      );
    }
  }

  getRecentActivity(userId) {
    this.usersService.getRecentActivity(userId).subscribe(
      (data) => {
        this.lastSeen = data['maxSeenTime'];
        this.lastReceive = data['maxReceiverTime'];
      }
    );
  }

  isReceived(message) {
    if (message.class == 'rightChips' && !this.isSeen(message)) {
      if (message.seenTime == null &&
        message.receiveTime != null &&
        !(message.serverTime <= this.lastSeen)) {
        return true;
      }
      if (message.serverTime <= this.lastReceive &&
        !(message.serverTime <= this.lastSeen)) {
        return true;
      }
    }
    return false;
  }

  isSeen(message) {
    if (message.class == 'rightChips') {
      if (message.seenTime != null &&
        !(message.serverTime <= this.lastReceive)) {
        return true;
      }
      if (message.serverTime <= this.lastSeen) {
        return true;
      }
    }
    return false;
  }

  isSent(message) {
    if (message.class == 'rightChips') {
      if (!this.isSeen(message) && !this.isReceived(message)) {
        if (message.serverTime != null)
          return true;
      }
    }
    return false;
  }

  isImage(element) {
    let result = new RegExp('img|jpg|ico|png|tif');
    return result.test(element.split('.')[1]);
  }
}
