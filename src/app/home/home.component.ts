import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  features!: Array<{title: string, done: boolean}>;
  constructor() { }

  ngOnInit() {
    this.features = [
      { title: 'Responsive', done: true },
      { title: 'Upgrade to angular 14', done: true},
      { title: 'Android and IOS deprecated and will replace by flutter version', done: false},
      { title: 'Change theme color', done: true },
      { title: 'Register new user', done: true },
      { title: 'Login use social account: Facebook, Google, Github', done: true },
      { title: 'User list: auto update if new user create somewhere', done: true }
    ];
  }

}
