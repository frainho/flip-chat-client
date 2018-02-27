import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  room = 255699;
  socket = io('http://localhost:3000');
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  sendMessage(message) {
    this.socket.emit('sending-message', message);
    this.chatService.update(this.room, message);
  }

}
