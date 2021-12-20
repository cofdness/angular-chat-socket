import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  features: any;
  constructor() { }

  ngOnInit() {
    this.features = [
      { title: 'Responsive', done: true },
      { title: 'Multi platform: web, android app, ios app', done: true},
      { title: 'Change theme color', done: true },
      { title: 'Register new user', done: true },
      { title: 'Login use social account: Facebook, Google, Github', done: true },
      { title: 'User list: auto update if new user create somewhere', done: true },
      { title: 'Add friend (soon)', done: false },
      { title: 'Chat (soon)', done: false }
    ];
  }

}
