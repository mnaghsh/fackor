import {Component, OnDestroy, OnInit, Renderer2, ElementRef, HostListener} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {UsersService} from "../../../services/users/users.service";
import {MatBottomSheet, MatDialog, MatSnackBar} from '@angular/material';
import {SocketService} from '../../../services/socket/socket.service';
import {MessagesService} from "../../../services/messages/messages.service";
import {DialogComponent} from "../../../components/dialog/dialog.component";
import {CommandExecutor} from 'selenium-webdriver/safari';
import {CommonService} from 'src/services/common/common.service';
import {AndroidAPI} from "resource/android";
import {MessageModel, StatusModel, UserStatusService} from "../../../services/user-status/user-status.service";
import {TrackingService} from "../../../services/tracking/tracking.service";
import {ConfigStyleService} from "../../../services/config-style.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  showNavBar = true;
  pages: Array<{ label: string, path: any, icon: any }>;
  singlePages: Array<{ label: string, path: any, icon: any }>;
  public activeUserInfo;
  public userMission;
  users;
  public newMessages;
  userPosition;
  alpha;

  constructor(
    private renderer: Renderer2,
    private elemRef: ElementRef,
    private authService: AuthService, 
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    public socketService: SocketService,
    public myRoute: Router,
    private messageService: MessagesService,
    private userStatusService: UserStatusService,
    private bottomSheet: MatDialog,
    private androidAPI: AndroidAPI,
    private commonService: CommonService,
    private trackingService: TrackingService,
    private configStyleService: ConfigStyleService) {
    window.addEventListener('deviceorientation', this.deviceOrientation);
    this.pages = [
      {label: ' پیام  ', path: "/messages", icon: "fal fa-comments"},
      {label: ' خبر ', path: "/news", icon: "far fa-envelope"},
      {label: '  گزارش وضعیت ', path: "/report", icon: "fas fa-pencil"},
      {label: ' ردگیری ', path: "/tracking", icon: "fal fa-compass"},
      {label: ' کالک ', path: "/calk", icon: "fas fa-map"},
      {label: ' داشبورد ', path: "", icon: "fas fa-tachometer"},
    ];

    this.singlePages = [
      {label: ' اطلاعات کاربر ', path: "/user-info", icon: "fas fa-user"},
      {label: ' بروزرسانی ', path: "/update", icon: "fas fa-refresh"},
      {label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera"},
    ];
  }

  @HostListener('deviceOrientation', ['$event']) ondeviceorientation(event) {
    console.log('eeeee', event);
  }

  deviceOrientation(event) {
    this.alpha = event.alpha;
  }

  ngOnInit() {
    console.log(this.myRoute)
    // jsInterfaceNotification('00', 'senderUsername')
    this.commonService.getfields();
    this.setUserInfo();
    this.socketService.initSocketEvent();
    this.messageService.initMessagesEvent();
    this.socketService.autoSender = true;
    this.socketService.openSocket(this.activeUserInfo['id']);
    this.messageSocketWatcher();
    this.openSocketWatcher();
    this.closeSocketWatcher();
    this.localStorageWatcher();
    this.socketService.usersWatcher();
    this.messageService.sendOfflineMessages();
    this.showNewMessages();
    this.userPosition = this.usersService.getUserPosition(this.activeUserInfo['id']);
    this.toggleShowNavBar();
  }

  logout() {
    this.androidAPI.jsInterfaceLogout();

    // this.socketService.sendMessage(this.activeUserInfo['id'], 'logout', 'logout');
    this.socketService.autoSender = false;
    this.socketService.updateUsersOnline(this.activeUserInfo['id']);

    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00: 01: 01 GMT; path=/";
    this.authService.removeActiveUserData();
    this.myRoute.navigate(['login']);
    this.socketService.webSocket.close();
    this.trackingService.canInitLayers = true;
    // this.authService.logout().subscribe(
    //   () => {
    //   },
    //   (error) => {
    //     if (error.status === 0) {
    //       this.authService.removeActiveUserData();
    //       this.myRoute.navigate(['login']);
    //       this.trackingService.canInitLayers = true;
    //     }
    //   },
    //   () => {
    //     this.authService.removeActiveUserData();
    //     this.myRoute.navigate(['login']);
    //     this.socketService.webSocket.close();
    //     this.trackingService.canInitLayers = true;
    //   }
    // );
  }

  ngOnDestroy() {
    this.socketService.completeEvents();
    this.messageService.completeMessagesEvent();
  }

  messageSocketWatcher() {
    let that = this;
    this.socketService.socketEvent.subscribe(
      (event) => {
        let y = event.data.split("-");
        let x = y[0].split("|");
        let senderUsername = this.initUserName(x[1]);
        if (x[0] === "message" &&
          (x[3] === "news" || x[3] === "text")) {
          that.showEventMessage(senderUsername + ': ' + x[2]);
          if(x[3] === "text"){
            this.messageService.addNumberOfNewMessages(x[1], x[2]);
            // this.addNumberOfNewMessages(Number(x[1]));
            this.userStatusService.addNumberOfNewMessages(Number(x[1]));
          }
          console.log('x', x);
          this.androidAPI.jsInterfaceNotification(x[2], senderUsername, y);
        }
      }
    );
  }

  initUserName(userId) {
    let user = userId;
    this.users = this.usersService.getOrgForFightUsers();
    if (this.users) {
      this.users.forEach(element => {
        if (String(element.user.id) === userId) {
          user = element.user.firstname + ' ' + element.user.lastname;
        }
      });
    }
    return user;
  }

  openSocketWatcher() {
    this.socketService.webSocketOpenEvent.subscribe(
      (e) => {
        if (!this.socketService.webSocketStatus.isOnline) {
          this.authService.autoLogin().subscribe(
            () => {
              this.usersService.setInfo(this.authService.activeUser);
              this.activeUserInfo = this.usersService.getUserInfo();
              this.userMission = this.usersService.getMission();
              this.socketService.webSocketStatus.isOnline = true;
              this.showEventMessage('شما با موفقیت به شبکه متصل شدید.');
            }, (er) => {
            },
            () => {
              this.messageService.sendOfflineMessages();
            }
          );
        }
      }
    );
  }

  closeSocketWatcher() {
    this.socketService.webSocketCloseSocket.subscribe(
      (e) => {
        if (this.socketService.webSocketStatus.isOnline) {
          this.showEventMessage('ارتباط شما قطع است.');
        }
        this.socketService.webSocketStatus.isOnline = false;
        setTimeout(() => {
          if (this.socketService.autoSender && !this.socketService.webSocketStatus.isOnline) {
            this.socketService.openSocket(this.activeUserInfo['id']);
          }
        }, 3000);
      }
    );
  }

  showEventMessage(message) {
    this.snackBar.open(message, '', {
      direction: 'rtl',
      duration: 3000,
    });
  }

  localStorageWatcher() {
    this.usersService.localStorageSet.subscribe(
      () => {
        this.setUserInfo();
      }
    );
  }

  setUserInfo() {
    this.activeUserInfo = this.usersService.getUserInfo();
    this.userMission = this.usersService.getMission();
    // this.userStatusService.initUserStatus(this.activeUserInfo['id']);
    this.userStatusService.get(this.activeUserInfo['id']);

  }

  showNewMessages() {
    +new Date;
    this.messageService.setNewMessages();
    this.messageService.newMessagesEvent.subscribe(
      () => {
        this.newMessages = this.messageService.getSortNewMessages();
        if (this.newMessages.length > 0) {
          this.newMessages.forEach(
            (userMessages) => {
              this.messageService.putReceiveTime(userMessages.userId);
              // this.addNumberOfNewMessages(userMessages.userId, userMessages.messages.length);
              this.userStatusService
                .addNumberOfNewMessages(userMessages.userId, userMessages.messages.length);
              console.log(this.userStatusService.userStatus);
            }
          );
          this.bottomSheet.closeAll();
          this.bottomSheet.open(DialogComponent, {
            width: '60%',
            data: this.newMessages
          });
        }
      }
    );
  }

  showUserDetails(id) {
    return this.usersService.getUserPosition(id);
  }

  addNumberOfNewMessages(userId, numberOfNewMessages = 1) {
    let userExist = false;
    let userStatus = this.userStatusService.get(this.activeUserInfo['id']);
    userStatus.value.message.numberOfNewMessages += numberOfNewMessages;
    userStatus.value.message.newUsersMessages.forEach(
      (userMessages) => {
        if (userMessages.id === userId) {
          userMessages.number += numberOfNewMessages;
          userExist = true;
        }
      }
    );
    if (!userExist) {
      const userMessages = {
        id: userId,
        number: numberOfNewMessages
      };
      userStatus.value.message.newUsersMessages.push(userMessages);
    }
    this.userStatusService.set(userStatus);
  }

  toggleShowNavBar() {
    this.configStyleService.showNavBar.subscribe(
      () => {
        this.showNavBar = !this.showNavBar;
        this.configStyleService.navBarStatus = this.showNavBar;
      }
    );
  }

  toggleEvent() {
    this.configStyleService.showNavBar.next();
  }

}
