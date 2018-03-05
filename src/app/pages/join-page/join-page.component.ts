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
  roomList: Array<string> = [];

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('rooms') !== '') {
      this.roomList = JSON.parse(localStorage.getItem('rooms'));
    }
  }

  joinChat(room, handle) {
    if (handle.length > 0) {
      this.shortName = false;
      localStorage.setItem('handle', handle);
      if (this.roomList.length > 10) {
        this.roomList.pop();
      }
      this.roomList.unshift(room);
      localStorage.setItem('rooms', JSON.stringify(this.roomList));
      this.chatService
        .getRoom(room, false)
        .then(() => this.router.navigate([`/room/${room}`]));
    } else {
      this.shortName = true;
    }
  }
}
