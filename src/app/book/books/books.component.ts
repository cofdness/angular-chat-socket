import {Component, OnInit} from '@angular/core';
import {GoogleBooksService} from '../book.service';
import {Store} from '@ngrx/store';
import {addBook, removeBook, retrieveBookList} from '../books.action';
import {selectBookCollection, selectBooks} from '../books.selectors';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  constructor(
    private bookService: GoogleBooksService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.bookService
      .getBooks()
      .subscribe({
        next: books => {
          console.log(books);
          this.store.dispatch(retrieveBookList({books}))
        }
      });
  }

  onAddBook(bookId: string) {
    this.store.dispatch(addBook({bookId}));
  }

  onRemoveBook(bookId: string) {
    this.store.dispatch(removeBook({bookId}));
  }
}
