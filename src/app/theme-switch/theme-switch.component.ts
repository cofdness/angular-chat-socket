import {Component, OnInit} from '@angular/core';

import {ThemeOption} from "../theme-option";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  themeOptions!: Array<ThemeOption>
  activeTheme!: ThemeOption

  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.getThemeOption().subscribe(themeOptions => {
      this.themeOptions = themeOptions
      this.activeTheme = this.themeOptions[0]

      //default theme
      document.documentElement.classList.add(this.activeTheme.value);
    })
  }

  ngOnInit(): void {
  }

  onChangeTheme(themeOption: ThemeOption) {
    this.activeTheme = themeOption
    this.themeOptions.forEach(themeOption => {
      if (document.documentElement.classList.contains(themeOption.value)) {
        document.documentElement.classList.remove(themeOption.value)
      }
    })
    document.documentElement.classList.add(this.activeTheme.value)
  }

}
