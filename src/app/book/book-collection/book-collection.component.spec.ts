import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookCollectionComponent } from './book-collection.component';

describe('BookCollectionComponent', () => {
  let component: BookCollectionComponent;
  let fixture: ComponentFixture<BookCollectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCollectionComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
