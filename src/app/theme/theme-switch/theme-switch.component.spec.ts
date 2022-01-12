import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitchComponent } from './theme-switch.component';
import {provideMockStore} from '@ngrx/store/testing';
import {MatMenuModule} from '@angular/material/menu';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      providers: [provideMockStore({})],
      declarations: [ ThemeSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
