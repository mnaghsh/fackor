import {Component, OnInit, AfterViewChecked, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {UsersService} from '../../../../services/users/users.service';
import {LocalStorageService} from "../../../../services/local-storage/local-storage.service";
import {SocketService} from "../../../../services/socket/socket.service";
import {MessagesService} from "../../../../services/messages/messages.service";
import {MatBottomSheet, MatDialog} from "@angular/material";
import {DialogComponent} from "../../../../components/dialog/dialog.component";
import {ReplaySubject} from "rxjs/internal/ReplaySubject";
import {ActivatedRoute} from "@angular/router";
import {UserStatusService} from "../../../../services/user-status/user-status.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewChecked, OnDestroy {
  public activeUserInfo: any;
  public newMessages: Array<any>;
  public orgForFightUsers = [];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // private des: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(public userService: UsersService,
              private localStorage: LocalStorageService,
              private socketService: SocketService,
              private messageService: MessagesService,
              private bottomSheet: MatDialog,
              private route: ActivatedRoute,
              private userStatusService: UserStatusService) {
  }

  ngOnInit() {
    this.activeUserInfo = this.userService.getUserInfo();
    this.getUsers();
    this.scrollToBottom();
    this.resetNumberOfNewMessages();
    // this.route.params.subscribe(
    //   (data) => {
        this.initNewMessages();
    //   }
    // );
  }

  ngOnDestroy() {
    // this.socketService.socketEvent.unsubscribe();
    // this.messageService.newMessages.unsubscribe();
  }

  initNewMessages() {
    this.newMessages = this.messageService.getSortNewMessages();
    console.log(this.newMessages);
  }

  getUsers() {
    this.orgForFightUsers = this.userService.getOrgForFightUsers();
    this.userService.getSize().subscribe(
      (size: any) => {
        this.orgForFightUsers.forEach(record => {
          size.forEach(s => {
            if (s.name === record.orgForFight.unit.size) {
              record.orgForFight.unit.text = s.translate + ' ';
            }
          })

        });
      }, err => {
        console.log('خطا');
      }
    );
  }

  scrollToBottom() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  contactClick(userId) {
  }

  getUserStatus(id) {
    return this.socketService.userIsOnline(id);
  }


  resetNumberOfNewMessages() {
    let messages = this.newMessages;
    this.messageService.resetNewMessageNumberEvent.subscribe(
      (userId) => {
        this.orgForFightUsers.forEach(
          (orgForFight) => {
            if (orgForFight.user.id == userId) {
              orgForFight.numberOfNewMessages = 0;
            }
          }
        );
        if (messages) {
          messages.forEach(
            (userMessages, i) => {
              if (userMessages.userId == userId)
                messages.splice(i, 1);
            }
          );
        }
        this.messageService.setSortNewMessages(messages);
      }
    );
  }

  public showUserPosition(id) {
    return this.userService.getUserPosition(id);
  }


}
