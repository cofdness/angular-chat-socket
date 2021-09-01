import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketServerUrl: string;
  socket: any;

  constructor() {
    this.socketServerUrl = environment.apiUrl;
    this.socket = io(this.socketServerUrl);
  }
}
