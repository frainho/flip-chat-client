import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatService } from '../../services/chat.service';
import { SocketsService } from '../../services/sockets.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, AfterViewChecked {
  roomId: String;
  roomData: Object;
  messages: Array<Object> = [];
  handle: string = localStorage.getItem('handle');
  connection;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private chatService: ChatService,
    private socketsService: SocketsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.scrollToBottom();
    this.activatedRoute.params.subscribe(params => {
      this.roomId = String(params.id);
      this.chatService.getRoom(this.roomId, false).then(data => {
        this.messages = data.messages;
        this.identSender(this.messages);
        this.roomId = data.code;
        this.socketsService.joinRoom(this.roomId);
      });
    });
    this.connection = this.socketsService
      .getMessages()
      .subscribe((message: any) => {
        this.messages.push(message);
        this.identSender(this.messages);
      });
  }

  sendMessage(message) {
    const fullMessage = {
      message,
      handle: this.handle
    };
    this.socketsService.emitMessage(fullMessage);
    this.chatService.update(this.roomId, fullMessage);
  }

  disconnect() {
    this.socketsService.disconnect();
    this.router.navigate(['/disconnect']);
  }

  identSender(messages) {
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].handle === localStorage.getItem('handle')) {
        messages[i].isUser = true;
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
