import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../theme.service";
import {Observable} from "rxjs";
import {ThemeOption} from "../theme-option";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

}
