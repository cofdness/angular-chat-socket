import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.initializeApp();
  }

  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getCurrentUser().subscribe({
        next: (data) => {
          this.router.navigate(['user/user-info']).then();
        },
      });
    }
  }

  initializeApp() {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icon/github-logo.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'skype',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icon/skype.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icon/google-logo.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icon/facebook-icon.svg'
      )
    );
  }
}
