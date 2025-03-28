import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000'); 
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessages(callback: Function) {
    this.socket.on('message', (msg: string) => {
      callback(msg);
    });
  }
}
