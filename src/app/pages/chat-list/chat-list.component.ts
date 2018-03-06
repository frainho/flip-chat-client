import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  rooms: Array<string>;
  handleName = localStorage.getItem('handle');
  handleMissing: Boolean;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('handle') === null || localStorage.getItem('handle') === '') {
      this.handleMissing = true;
    } else {
      this.handleMissing = false;
    }
    if (localStorage.getItem('rooms') !== '') {
      this.rooms = JSON.parse(localStorage.getItem('rooms'));
    }
  }

  updateHandle(newHandle) {
    if (newHandle !== '') {
      localStorage.setItem('handle', newHandle);
      this.handleMissing = false;
    } else {
      this.handleName = localStorage.getItem('handle');
    }
  }

  connectToRoom(room) {
    this.chatService.getRooms().then((allRooms: any) => {
      for (let i = 0; i < allRooms.length; i++) {
        if (allRooms[i].code === room && allRooms[i].isProtected) {
          this.router.navigate(['/join', room]);
          break;
        } else if (allRooms[i].code === room) {
          this.router.navigate(['/room', room]);
          break;
        }
      }
    });
  }

}
