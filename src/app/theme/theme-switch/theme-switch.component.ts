import {Component, OnInit} from '@angular/core';
import {isTheme, Mode, Theme} from '../theme.model';
import {Store} from '@ngrx/store';
import {selectTheme} from '../theme.selector';
import {changeTheme} from '../theme.action';
import {Observable} from "rxjs";
import {ThemeState} from "../theme.state";

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  primaryColors: string[] = ['purple', '#673AB7', '#009688', '#2196F3', 'indigo' , 'teal', 'orange'];
  accentColors: string[] = ['#ffc107', '#ff4081', '#607d8b', '#4caf50', '#008080', ];
  themeModes = [Mode.light, Mode.dark];
  primaryColor = this.primaryColors[0];
  accentColor = this.accentColors[0];
  themeMode: Mode;
  theme$: Observable<Theme>
  constructor(
    private store: Store<ThemeState>
  ) {
    this.themeMode = Mode.light;
    this.theme$ = this.store.select<Theme>(selectTheme);
  }

  async ngOnInit(): Promise<void> {
    // Storage.remove({ key: 'themeObject'}).then();
      const value = localStorage.getItem('themeObject')
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
    this.store.dispatch(changeTheme(theme));
  }

  onSelectPrimary(color: string) {
    this.setTheme({primary: color, accent: null, mode: null});
  }

  onSelectAccent(color: string) {
    this.setTheme({primary: null, accent: color, mode: null});
  }

  onSelectMode(mode: Mode) {
    this.setTheme({primary: null, accent: null, mode});
  }
}

