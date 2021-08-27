import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ThemeOption} from "./theme-option";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private http: HttpClient
  ) { }

  getThemeOption(): Observable<Array<ThemeOption>> {
    return this.http.get<Array<ThemeOption>>("assets/theme-options.json")
  }
}
