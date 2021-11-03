import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeepLinkService {

  constructor(private platform: Platform) { }

  deeplink(params: any){
    let stringParams: string;
    if (typeof params === 'object') {
      stringParams = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    }
    console.log(stringParams);
    window.location.href = `${environment.deepLinkUri}/login?${stringParams}`;
  }
}
