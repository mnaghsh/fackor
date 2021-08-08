// public webSocket;
// public messages;
//
//
// openSocket(){
//   // Ensures only one connection is open at a time
//   if(this.webSocket !== undefined && this.webSocket.readyState !== WebSocket.CLOSED){
//     console.log("WebSocket is already opened.");
//     return;
//   }
//   // Create a new instance of the websocket
//   //webSocket = new WebSocket("ws://192.168.1.116:8084/nakamessanger/echo");
//
//   this.webSocket = new WebSocket("ws://192.168.1.116:8084/Fackur/echo");
//
//   /**
//    * Binds functions to the listeners for the websocket.
//    */
//   this.webSocket.onopen = function(event){
//     // For reasons I can't determine, onopen gets called twice
//     // and the first time event.data is undefined.
//     // Leave a comment if you know the answer.
//     if(event.data === undefined)
//       return;
//
//     console.log(event.data);
//   };
//
//   this.webSocket.onmessage = function(event){
//     console.log(event.data);
//   };
//
//   this.webSocket.onclose = function(event){
//     console.log("Connection closed");
//   };
// }
//
//
//
// writeResponse(text){
//   this.messages = "<br/>" + text;
// }
//# sourceMappingURL=sadaw.js.map