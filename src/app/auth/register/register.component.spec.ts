import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { RegisterComponent } from './register.component';
import {Apollo} from "apollo-angular";
import {RouterTestingModule} from "@angular/router/testing";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [Apollo],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
