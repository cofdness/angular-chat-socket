import {Book} from './book.model';

export interface BookState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
}
