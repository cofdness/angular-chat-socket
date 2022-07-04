import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user';
import {DeepLinkService} from '../../deep-link.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: User | null;

  constructor(
    private authService: AuthService,
    private deepLinkService: DeepLinkService
  ) {
    this.user = null;
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

}
