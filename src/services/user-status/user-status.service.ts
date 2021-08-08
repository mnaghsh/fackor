import {Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {UsersService} from "../users/users.service";

export interface MessageModel {
  numberOfNewMessages: number;
  newUsersMessages: Array<{ id: number, number: number }>;
}

export interface StatusModel {
  id: number;
  value: {
    message: MessageModel;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  constructor(private localStorageService: LocalStorageService,
              private usersService: UsersService) {
  }

  userStatus: StatusModel;

  initUserStatus(userId) {
    this.userStatus = {
      id: userId,
      value: {
        message: {numberOfNewMessages: 0, newUsersMessages: []}
      }
    };
  }


  setMessageStatus(messageStatus: MessageModel, userId: number) {


  }

  get(id: number): any {
    const usersStatus: any = this.localStorageService.getJson('usersStatus');
    if (usersStatus) {
      usersStatus.forEach(
        (user) => {
          if (user.id == id) {
            this.userStatus = user;
          }
        }
      );
    }
    if (!this.userStatus) {
      this.userStatus = this.initNewStatus(id);
    }
    return this.userStatus;
  }

  set(userStatus: StatusModel) {
    let userStatusExist = false;
    let usersStatus = this.localStorageService.getJson('usersStatus');
    if (!usersStatus) {
      usersStatus = [];
    }
    for (let index in usersStatus) {
      if (userStatus.id == usersStatus[index].id) {
        usersStatus[index] = userStatus;
        userStatusExist = true;
      }
    }
    if (!userStatusExist) {
      usersStatus.push(userStatus);
    }
    this.localStorageService.setJson('usersStatus', usersStatus);
    this.userStatus = userStatus;
  }

  initNewStatus(id: number): StatusModel {
    const status = {
      id: id,
      value: {
        message: {
          numberOfNewMessages: 0,
          newUsersMessages: []
        }
      }
    }
    return status;
  }

  resetNumberOfNewMessages(id: number) {
    let numberOfNew = 0;
    this.userStatus.value.message.newUsersMessages.forEach(
      (user) => {
        if (user.id == id) {
          numberOfNew = user.number;
          user.number = 0;
        }
      }
    );
    if (this.userStatus.value.message.numberOfNewMessages)
      this.userStatus.value.message.numberOfNewMessages -= numberOfNew;
    this.set(this.userStatus);
  }


  addNumberOfNewMessages(userId, numberOfNewMessages = 1) {
    let userExist = false;
    let userStatus = this.userStatus;
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
    this.set(userStatus);
  }
}
