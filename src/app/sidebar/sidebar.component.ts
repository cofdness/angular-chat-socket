import { Component, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar.service';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showSubmenu = false;

  constructor(
    public sidebarService: SidebarService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }



}
