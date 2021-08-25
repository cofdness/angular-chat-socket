import {Component, Inject, OnInit} from '@angular/core';

import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  // theme: string

  // array of theme name
  appThemes = ['light-theme', 'dark-theme']

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    //default theme is light
    this.document.documentElement.classList.add(this.appThemes[0]);
  }

  onChangeTheme(theme: string) {
    this.appThemes.forEach(appTheme => {
      if (this.document.documentElement.classList.contains(appTheme)) {
        this.document.documentElement.classList.remove(appTheme)
      }
    })
    this.document.documentElement.classList.add(theme)
  }

}
