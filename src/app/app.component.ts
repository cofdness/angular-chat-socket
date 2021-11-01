import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "./user/user.service";
import {Router} from "@angular/router";
import {Deeplinks} from "@ionic-native/deeplinks/ngx";
import {Platform} from "@ionic/angular";
import {LoginComponent} from "./auth/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private deepLinks: Deeplinks,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUser().subscribe(
        () => this.router.navigate(['user/user-info'])
      );
    }
  }

  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      if (this.platform.is('mobile')){
        this.deepLinks.route({
          '/login': LoginComponent
        }).subscribe(match => {
          console.log(match.$args);
        });
      }
    });
  }

}
