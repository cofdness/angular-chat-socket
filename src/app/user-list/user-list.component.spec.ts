import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {Apollo} from "apollo-angular";
import {GraphQLModule} from "../graphql/graphql.module";
import {HttpClientModule} from "@angular/common/http";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [Apollo],
      imports: [HttpClientModule, GraphQLModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
