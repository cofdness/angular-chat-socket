import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {AfterViewInit, ApplicationRef, Component, HostBinding} from '@angular/core';
import {fromEvent, OperatorFunction} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';
import {SidebarService} from "./sidebar.service";

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-sticky-header',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 2;
      }
    `
  ],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class StickyHeaderComponent implements AfterViewInit {
  private isVisible = true;
  private stickyY = 0;

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private appRef: ApplicationRef,
    private sidebarService: SidebarService
  ) {
  }
  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  ngAfterViewInit() {
    // const scroll$ = fromEvent(window, 'scroll').pipe(
    const scroll$ = this.scrollDispatcher.scrolled()
      .pipe(
      throttleTime(10) as OperatorFunction<void | CdkScrollable, CdkScrollable>,
      map((scrollable: CdkScrollable) => scrollable.measureScrollOffset('top')),
      pairwise(),
      map(([y1, y2]): Direction => {
        if (y2 === 0) {
          return Direction.Up;
        }
        if (y2 >= y1) {
          this.stickyY = y1;
          return Direction.Down;
        }
        if (y2 < y1 && y2 < this.stickyY) {
          return Direction.Up;
        }
        return Direction.Down;
      }),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => {
      this.isVisible = true;
      this.sidebarService.marginTop = true;
      this.appRef.tick();
    });
    goingDown$.subscribe(() => {
      this.isVisible = false;
      this.sidebarService.marginTop = false;
      this.appRef.tick();
    });
  }
}
