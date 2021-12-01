import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../user/user';
import { Apollo, gql } from 'apollo-angular';
import {Router} from '@angular/router';
import { Storage } from '@capacitor/storage';
import {mutationGraphql} from '../graphql/mutation.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: User | null;
  isLoggedIn$: BehaviorSubject<boolean>;
  user$: BehaviorSubject<User>;
  // isLoggedIn = false;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.user$ = new BehaviorSubject<User>(null);
  }

   login(email: string, password: string): Observable<User>{
    return this.apollo.mutate({
      mutation: mutationGraphql.login,
      variables: {
        email,
        password
      }
    }).pipe(map( ({data}) => {
      // @ts-ignore
      const user = data.login as User;
      this.nextUser$(user);
      this.setItemToStorage('token', user.accessToken.token).then();
      this.nextIsLoggedIn$(true);
      return user;
    } ));
  }

  logout(): Promise<void> {
    this.isLoggedIn$.next(false);
    this.nextUser$(null);
    return this.removeItemFromStorage('token');
  }

  setItemToStorage(key, value): Promise<void>{
    return Storage.set({
      key,
      value
    });
  }
  getItemFromStorage(key) {
    return Storage.get({key});
  }
  removeItemFromStorage(key) {
    return Storage.remove({key});
  }

  nextIsLoggedIn$(value: boolean) {
    this.isLoggedIn$.next(value);
  }

  nextUser$(user: User) {
    this.user$.next(user);
  }

  handleError(error: HttpErrorResponse): HttpErrorResponse {
    this.httpError = error;
    return this.httpError;
  }
}
