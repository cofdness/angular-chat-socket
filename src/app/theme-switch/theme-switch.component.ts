import {Component, OnInit} from '@angular/core';

import {ThemeOption} from '../theme-option';
import {ThemeService} from '../theme.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  activeTheme!: ThemeOption;

  constructor(
    public themeService: ThemeService,
  ) {
    this.themeService.getThemeOptions().subscribe((themeOptions) => {
      this.activeTheme = this.themeService.themeOptions[0];
      Storage.get({key: 'theme'}).then(theme => {
        if (theme.value) {
          for (const themeOption of themeOptions) {
            if (theme.value === themeOption.value) {
              this.activeTheme = themeOption;
              break;
            }
          }
        }
        this.themeService.setTheme(this.activeTheme);
      });
    });
  }

  ngOnInit(): void {
  }

  onChangeTheme(themeOption: ThemeOption) {
    Storage.set({
      key: 'theme',
      value: themeOption.value
    }).then(() => {
      this.activeTheme = themeOption;
      this.themeService.setTheme(themeOption);
    });
  }

}
