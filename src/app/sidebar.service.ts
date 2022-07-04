import {ApplicationRef, ChangeDetectorRef, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnDestroy{

  mobileQuery: MediaQueryList;
  sidebarOpen = false;
  mobileRes: BehaviorSubject<boolean>;
  private _marginTop = false;
  private readonly mobileQueryListener: (event: any) => void;

  constructor(
    private appRef: ApplicationRef ,
    private media: MediaMatcher
  ) {

    this.marginTop = true;
    if (window.innerWidth > 960) {
      this.mobileRes = new BehaviorSubject<boolean>(false);
    }
    else {
      this.mobileRes = new BehaviorSubject<boolean>(true);
    }

    this.mobileQuery = media.matchMedia('(max-width: 960px)');
    this.mobileQueryListener = (event) => {
      if (event.matches) {
        this.sidebarOpen = false;
        this.mobileRes.next(true);
      } else {
        this.sidebarOpen = true;
        this.mobileRes.next(false);
      }
      return appRef.tick();
    };
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  get marginTop(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._marginTop;
  }

  set marginTop(value: boolean) {
    // eslint-disable-next-line no-underscore-dangle
    this._marginTop = value;
  }

  toggleSidebar(toggleFromTopBar: boolean) {
    // in small screen, user click on screen to make the sidebar nav close,
    // so we must check it
    if (toggleFromTopBar) {
      this.sidebarOpen = !this.sidebarOpen;
    }
    else {
      this.sidebarOpen = false;
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

}
