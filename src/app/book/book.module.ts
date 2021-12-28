import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import {BooksComponent} from './books/books.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookCollectionComponent} from './book-collection/book-collection.component';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookCollectionComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatButtonModule,
    FlexModule,
    FlexLayoutModule
  ]
})
export class BookModule { }
