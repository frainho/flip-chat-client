import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {
  }

  update(room, message): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/${room}/update`, { message: message}, options)
      .toPromise();
  }

}
