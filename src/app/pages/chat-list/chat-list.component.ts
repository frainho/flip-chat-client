import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  rooms: Array<string>;
  handleName = localStorage.getItem('handle');

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('rooms') !== '') {
      this.rooms = JSON.parse(localStorage.getItem('rooms'))
    }
  }

  updateHandle(newHandle) {
    if (newHandle !== '') {
      localStorage.setItem('handle', newHandle);
    } else {
      this.handleName = localStorage.getItem('handle');
    }
  }

}
