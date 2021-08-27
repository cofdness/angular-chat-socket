import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ThemeOption} from "./theme-option";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeOptions!: Array<ThemeOption>

  constructor( private http: HttpClient ) {
    this.getThemeOptions().subscribe(themeOptions => {
        this.themeOptions = themeOptions
      }
    )
  }

  getThemeOptions(): Observable<Array<ThemeOption>>{
    return this.http.get<Array<ThemeOption>>("assets/theme-options.json")
  }

  setTheme(themeOption: ThemeOption) {
    this.themeOptions.forEach(themeOption => {
      if (document.documentElement.classList.contains(themeOption.value)) {
        document.documentElement.classList.remove(themeOption.value)
      }
    })
    document.documentElement.classList.add(themeOption.value)
  }

}
