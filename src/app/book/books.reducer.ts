import {Book} from './book.model';
import {createReducer, on} from '@ngrx/store';
import {retrieveBookList} from './books.action';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrieveBookList, (state, { books }) => books)
);

