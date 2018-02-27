import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketsService } from '../../services/sockets.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  room = '255699';
  messages: Array<Object> = [];
  handler = 'filipe';
  connection;

  constructor(private chatService: ChatService, private socketsService: SocketsService) { }

  ngOnInit() {

    // requerir todos los mensages y guardarlos en messages

    this.connection = this.socketsService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
      this.identSender(this.messages);
    });
  }

  sendMessage(message) {
    const fullMessage = {
      message,
      handler: this.handler
    };
    this.socketsService.emitMessage(fullMessage);
    this.chatService.update(this.room, fullMessage);
  }

  identSender(messages) {
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].handler === this.handler) {
        messages[i].isUser = true;
      }
    }
  }

}
