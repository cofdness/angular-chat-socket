import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Book} from "../book.model";

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
})
export class BookCollectionComponent implements OnInit {

  @Input() books!: ReadonlyArray<Book> | null;
  @Output() remove = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}
