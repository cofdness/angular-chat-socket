import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import {FacebookService, InitParams} from 'ngx-facebook';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform,
    private zone: NgZone,
    private facebookService: FacebookService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUser().subscribe(
        () => this.router.navigate(['user/user-info'])
      );
    }
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const slug = event.url.split('chatsocket').pop();
        if (slug) {
          const queryString = slug.split('?').pop();
          if (queryString) {
            const params = new URLSearchParams(queryString);
            const accessToken = params.get('access_token');
            if (accessToken) {
              this.router.navigate(['login', accessToken]).then();
            }
          }
        }
      });
    });
    const initFacebookParams: InitParams = {
      xfbml: true,
      version: 'v12.0',
      appId: environment.facebookID
    };
    this.facebookService.init(initFacebookParams).then();
  }

}
