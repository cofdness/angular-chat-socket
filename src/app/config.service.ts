// host url
import {environment} from '../environments/environment';
export const hostApi = environment.apiUrl || 'http://192.168.31.202:9000';

import {WINDOW} from './window.providers';
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  hostUrl!: string;
  constructor(@Inject(WINDOW) private window: Window) {
    this.hostUrl = `http://${this.getHostname()}`;
  }

  getHostname(): string {
    return this.window.location.hostname;
  }
}
