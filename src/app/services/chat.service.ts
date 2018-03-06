import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatService {
  apiUrl = environment.apiUrl + 'api';
  private baseUrl = this.apiUrl;
  rooms: any = {};
  handle: string;

  constructor(private httpClient: HttpClient) { }

  update(room, message): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient
      .post(`${this.baseUrl}/${room}/update`, { message: message }, options)
      .toPromise();
  }

  getRoom(room): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient
      .post(`${this.baseUrl}/${room}`, options)
      .toPromise()
      .then(result => result);
  }

  createRoom(room, password) {
    const options = {
      withCredentials: true
    };
    const data = {
      room: room,
      password: password,
    };
    return this.httpClient.post(`${this.baseUrl}/new`, data, options)
      .toPromise().then(result => result);
  }

  getRooms() {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/all-rooms`, options)
      .toPromise().then(result => result);
  }

  authRoom(room, password) {
    const options = {
      withCredentials: true
    };
    const data = {
      room,
      password
    };
    return this.httpClient.post(`${this.baseUrl}/auth-room`, data, options)
      .toPromise().then(result => result);
  }

}
