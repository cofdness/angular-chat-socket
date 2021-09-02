import {ApplicationRef, ChangeDetectorRef, Injectable, OnDestroy} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnDestroy{

  mobileQuery: MediaQueryList;
  sidebarOpen = true

  private readonly _mobileQueryListener: (event) => void;

  constructor(appRef: ApplicationRef , media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 960px)');
    this._mobileQueryListener = (event) => {
      if (event.matches) {
        this.sidebarOpen = false
      } else {
        this.sidebarOpen = true
      }
      return appRef.tick()
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  toggleSidebar(toggleFromSidebar: boolean) {
    // in small screen, user click on screen to make the sidebar nav close,
    // so we must check it
    if (toggleFromSidebar) {
        this.sidebarOpen = !this.sidebarOpen
    }
    else {
      this.sidebarOpen = false
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
