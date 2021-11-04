import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeepLinkService {

  constructor() { }

  deeplink(params: any){
    let stringParams: string;
    if (typeof params === 'object') {
      stringParams = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    }
    console.log(stringParams);
    window.location.href = `${environment.deepLinkUri}/login?${stringParams}`;
  }
}
