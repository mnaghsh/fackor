import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AndroidAPI {
    constructor() {
    }

    jsInterfaceNotification(notifMessage, notifHead, x) {
        console.log('ssss')
        let JSInterface;
        let y = "";
        if(x[1])
            y = x[1];
        if (JSInterface)
            JSInterface['showNotif'](notifMessage, notifHead, y);
    }

    jsInterfaceLogout() {
        let JSInterface;
        if (JSInterface)
            JSInterface['userLogout']();
    }

    jsInterfaceSetToken(token, expireDate, uId, mId) {
        let JSInterface;
        if (JSInterface)
            JSInterface['setToken'](token, expireDate, uId, mId);
    }

}
