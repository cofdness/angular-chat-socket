import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user';
import {Platform} from '@ionic/angular';
import {DeepLinkService} from '../../deep-link.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private deepLinkService: DeepLinkService
  ) {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (this.platform.is('mobileweb')) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.deepLinkService.deeplink({access_token: localStorage.getItem('token')});
    }
  }

}
