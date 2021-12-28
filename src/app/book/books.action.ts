import { createAction, props } from '@ngrx/store';
import {Book} from './book.model';

export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId: string }>()
);

export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: string }>()
);

export const retrieveBookList = createAction(
  '[Book List/Api] Retrieve Books Success',
  props<{ books: ReadonlyArray<Book> }>()
);
