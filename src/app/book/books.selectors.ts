import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Book} from "./book.model";


export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');
export const selectCollectionState =  createFeatureSelector<ReadonlyArray<String>>('collection');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    if (collection instanceof Array) {
      return collection.map(id => books.find((book) => book.id === id)) as ReadonlyArray<Book>
    }
    return null;
  }
);
