import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user';
import {Platform} from "@ionic/angular";
import {DeepLinkService} from "../../deep-link.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private plaform: Platform,
    private deepLinkService: DeepLinkService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (this.plaform.is('mobileweb')) {
      this.deepLinkService.deeplink({access_token: localStorage.getItem('token')});
    }
  }

}
