import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketsService {
  apiUrl = environment.apiUrl;
  socket = io(this.apiUrl);

  constructor() { }

  emitMessage(fullMessage) {
    this.socket.emit('sending-message', fullMessage);
  }

  joinRoom(room) {
    this.socket.emit('join-room', room);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('new-message', message => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  leaveRoom(room) {
    this.socket.emit('leaving-room', room);
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}
