import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ThemeOption} from './theme-option';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeOptions!: Array<ThemeOption>;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.getThemeOptions().subscribe(themeOptions => {
        this.themeOptions = themeOptions;
      }
    );
  }

  getThemeOptions(): Observable<Array<ThemeOption>>{
    return this.http.get<Array<ThemeOption>>('assets/theme-options.json');
  }

  setTheme(themeOption: ThemeOption) {
    this.themeOptions.forEach(themeOpt => {
      if (this.document.documentElement.classList.contains(themeOpt.value)) {
        this.document.documentElement.classList.remove(themeOpt.value);
      }
    });
    this.document.documentElement.classList.add(themeOption.value);
  }

}
