import {Component, HostBinding, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar.service';
import {Platform} from '@angular/cdk/platform';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @HostBinding('style.top') topPosition;
  value = '';
  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService,
    private platform: Platform,
    private router: Router
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

  logout(){
    this.authService.logout().then(() => {
      this.router.navigate(['login']).then(() => {
        // refresh after log out
        window.location.reload();
        }
      );
    });
  }
}
