"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChatComponent = /** @class */ (function () {
    // action = Action;
    // user: User;
    // messages: Message[] = [];
    // messageContent: string;
    // ioConnection: any;
    function ChatComponent() {
    }
    ChatComponent.prototype.ngOnInit = function () {
        // this.initIoConnection();
    };
    ChatComponent.prototype.openSocket = function () {
        // Ensures only one connection is open at a time
        if (this.webSocket !== undefined && this.webSocket.readyState !== WebSocket.CLOSED) {
            console.log("WebSocket is already opened.");
            return;
        }
        // Create a new instance of the websocket
        // webSocket = new WebSocket("ws://192.168.1.116:8084/nakamessanger/echo");
        this.webSocket = new WebSocket("ws://192.168.1.116:8084/Fackur/echo");
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
    };
    ChatComponent.prototype.writeResponse = function (text) {
        this.messages = "<br/>" + text;
    };
    /**
     * Sends the value of the text input to the server
     */
    ChatComponent.prototype.send = function () {
        var text = "awdawd";
        this.webSocket.send(text);
    };
    ChatComponent.prototype.closeSocket = function () {
        this.webSocket.close();
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map