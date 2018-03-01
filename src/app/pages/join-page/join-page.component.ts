import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketsService } from '../../services/sockets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {
  randomRoom = Math.floor(100000 + Math.random() * 900000);
  handleName: string = localStorage.getItem('handle');
  shortName = false;

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {}

  joinChat(room, handle) {
    if (handle.length >= 6) {
      this.shortName = false;
      localStorage.setItem('handle', handle);
      this.chatService
        .getRoom(room, false)
        .then(() => this.router.navigate([`/room/${room}`]));
    } else {
      this.shortName = true;
    }
  }
}
