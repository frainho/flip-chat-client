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

  constructor(private httpClient: HttpClient) {}

  update(room, message): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient
      .post(`${this.baseUrl}/${room}/update`, { message: message }, options)
      .toPromise();
  }

  getRoom(room, bypassCache = true): Promise<any> {
    if (!bypassCache && this.rooms[room]) {
      return Promise.resolve(this.rooms[room]);
    }
    const options = {
      withCredentials: true
    };
    this.rooms[room] = this.httpClient
      .post(`${this.baseUrl}/${room}`, { room: room }, options)
      .toPromise()
      .then(result => {
        this.rooms[room] = result;
        return result;
      });
    return this.rooms[room];
  }
}
