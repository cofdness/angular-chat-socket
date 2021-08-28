import {ApplicationRef, ChangeDetectorRef, Injectable, OnDestroy} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnDestroy{

  mobileQuery: MediaQueryList;
  sidebarOpen = false

  private readonly _mobileQueryListener: () => void;

  constructor(appRef: ApplicationRef , media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 960px)');
    this._mobileQueryListener = () => appRef.tick();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    console.log(this.mobileQuery)
  }

  toggleSidebar() {
    if (this.mobileQuery.matches) {
      this.sidebarOpen = !this.sidebarOpen
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
