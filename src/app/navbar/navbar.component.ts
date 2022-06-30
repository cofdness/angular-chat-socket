import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  value = '';
  constructor(
    public sidebarService: SidebarService,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  sidebarToggle() {
    this.sidebarService.toggleSidebar(true);
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['login']).then(() => {
        // refresh after log out
        window.location.reload();
      }
    );
  }
}
