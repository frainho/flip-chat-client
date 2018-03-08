import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketsService } from '../../services/sockets.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {
  roomCode: String;
  roomList: Array<string> = [];
  newRoom = true;
  allRooms: any;
  passwordError = false;

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('rooms') !== null) {
      this.roomList = JSON.parse(localStorage.getItem('rooms'));
    }
    this.chatService.getRooms().then((result) => {
      this.allRooms = result;
      this.checkRoom();
    });
    this.route
      .params
      .subscribe(params => {
        this.roomCode = params['id'] || Math.floor(100000 + Math.random() * 900000).toString();
      });
  }

  checkRoom() {
    for (let i = 0; i < this.allRooms.length; i++) {
      if (this.allRooms[i].code === this.roomCode) {
        this.newRoom = false;
        break;
      } else {
        this.newRoom = true;
      }
    }
  }

  joinChat(room, password) {
    if (this.roomList.length > 10) {
      this.roomList.pop();
    } else if (this.roomList.indexOf(room) === -1) {
      this.roomList.unshift(room);
    }
    localStorage.setItem('rooms', JSON.stringify(this.roomList));
    if (this.newRoom) {
      this.chatService.createRoom(room, password)
        .then(() => this.router.navigate([`/room/${room}`]));
    } else {
      for (let i = 0; i < this.allRooms.length; i++) {
        if (this.allRooms[i].code === room && this.allRooms[i].isProtected) {
          if (!password) {
            this.passwordError = true;
            return;
          } else {
            this.passwordError = false;
            this.chatService.authRoom(room, password)
              .then((result: any) => {
                if (result.authorized) {
                  this.router.navigate([`/room/${room}`]);
                } else {
                  this.passwordError = true;
                }
              });
          }
        } else if (this.allRooms[i].code === room && !this.allRooms[i].isProtected) {
          if (password) {
            this.passwordError = true;
          } else {
            this.passwordError = false;
            this.router.navigate([`/room/${room}`]);
          }

        }
      }
    }
  }
}
