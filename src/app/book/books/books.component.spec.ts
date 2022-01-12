import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BooksComponent } from './books.component';
import {HttpClientModule} from '@angular/common/http';
import {provideMockStore} from '@ngrx/store/testing';
import {BookListComponent} from '../book-list/book-list.component';
import {BookCollectionComponent} from '../book-collection/book-collection.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent, BookListComponent, BookCollectionComponent ],
      providers: [provideMockStore({})],
      imports: [ HttpClientModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
