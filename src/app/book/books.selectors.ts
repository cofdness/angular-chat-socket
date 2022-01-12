import {createSelector} from '@ngrx/store';
import {BookState} from './book.state';


export const selectBooks = (state: BookState) => state.books;
export const selectCollectionState =  (state: BookState) => state.collection;

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    if (collection instanceof Array){
      collection.map(id => books.find((book) => book.id === id));
    } else {
      return collection;
    }
  }
);
