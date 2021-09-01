import {Component, OnInit} from '@angular/core';

import {ThemeOption} from '../theme-option';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  themeOptions!: Array<ThemeOption>;
  activeTheme!: ThemeOption;

  constructor(
    private themeService: ThemeService,
  ) {
    this.themeService.getThemeOptions().subscribe(themeOptions => {
      this.themeOptions = themeOptions;
      this.activeTheme = this.themeOptions[0];

      //default theme
      this.themeService.setTheme(this.activeTheme)
    });
  }

  ngOnInit(): void {
  }

  onChangeTheme(themeOption: ThemeOption) {
    this.activeTheme = themeOption;
    this.themeService.setTheme(themeOption);
  }

}
