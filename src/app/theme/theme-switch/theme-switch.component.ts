import {Component, OnInit} from '@angular/core';

import {ThemeOption} from '../theme-option';
import {ThemeService} from '../theme.service';
import { Storage } from '@capacitor/storage';
import { Theme } from '../theme.model';
import {isTheme, Mode} from '../theme.model';
import {Store} from '@ngrx/store';
import {selectTheme} from '../theme.selector';
import {changeTheme} from '../theme.action';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  primaryColors: string[] = ['#673ab7', '#3f51b5', '#e91e63', '#9c27b0', '#00ffff', '#800080'];
  accentColors: string[] = ['#ffc107', '#ff4081', '#607d8b', '#4caf50', '#008080', ];
  primaryColor = this.primaryColors[0];
  accentColor = this.accentColors[0];
  themeMode: Mode;
  theme$ = this.store.select(selectTheme);
  // activeTheme!: ThemeOption;
  constructor(
    private store: Store
    // public themeService: ThemeService,
  ) {
    // this.themeService.getThemeOptions().subscribe((themeOptions) => {
    //   this.activeTheme = this.themeService.themeOptions[0];
    //   Storage.get({key: 'theme'}).then(theme => {
    //     if (theme.value) {
    //       for (const themeOption of themeOptions) {
    //         if (theme.value === themeOption.value) {
    //           this.activeTheme = themeOption;
    //           break;
    //         }
    //       }
    //     }
    //     this.themeService.setTheme(this.activeTheme);
    //   });
    // });
  }

  async ngOnInit(): Promise<void> {
    Storage.remove({ key: 'themeObject'}).then();
      const {value} = await Storage.get({ key: 'themeObject'});
      if (value) {
        const theme = JSON.parse(value);
        if (isTheme(theme)) {
          this.setTheme(theme);
          return ;
        }
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        this.themeMode = Mode.dark;
      } else {
        this.themeMode = Mode.light;
      }
      const defaultTheme = {
        primary: this.primaryColor,
        accent: this.accentColor,
        mode: this.themeMode
      };
      this.setTheme(defaultTheme);
  }

  setTheme(theme: Theme) {
    Storage.set({
      key: 'themeObject',
      value: JSON.stringify(theme)
    }).then(() => {
      this.store.dispatch(changeTheme(theme));
    });
  }
}

