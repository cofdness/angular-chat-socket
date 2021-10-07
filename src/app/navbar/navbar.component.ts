import {Component, HostBinding, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar.service';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @HostBinding('style.top') topPosition;

  constructor(
    public sidebarService: SidebarService,
    public platform: Platform
  ) {
  }

  ngOnInit(): void {
    if (this.platform.IOS) {
      this.topPosition = '16px';
    } else {
      this.topPosition = 0;
    }
  }

  sidebarToggle() {
    this.sidebarService.toggleSidebar(true);
  }
}
