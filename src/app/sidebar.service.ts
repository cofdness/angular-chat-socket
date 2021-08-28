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
    this._mobileQueryListener = () => {
      if (this.mobileQuery.matches) {
        this.sidebarOpen = false
      }
      return appRef.tick()
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  toggleSidebar(toggleFromSidebar: boolean) {
    // in small screen, user click on screen to make the sidebar nav close,
    // so we must check it
    if (toggleFromSidebar) {
      if (this.mobileQuery.matches) {
        this.sidebarOpen = !this.sidebarOpen
      }
    }
    else {
      this.sidebarOpen = false
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
