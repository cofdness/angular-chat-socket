// host url
import {environment} from '../environments/environment';
export const serverUri = `${environment.apiProtocol}://${environment.serverAddress}`;
export const socketUri = `${environment.socketProtocol}://${environment.serverAddress}`;

import {WINDOW} from './window.providers';
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  hostUrl!: string;
  constructor(@Inject(WINDOW) private window: Window) {
    this.hostUrl = `${environment.clientProtocol}://${this.getHostname()}`;
  }

  getHostname(): string {
    return this.window.location.hostname;
  }
}
