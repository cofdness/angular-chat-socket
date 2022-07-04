import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../user/user';
import { Apollo } from 'apollo-angular';
import {mutationGraphql} from '../graphql/mutation.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: BehaviorSubject<boolean>;
  user$: BehaviorSubject<User | null>;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;

  constructor(
    private apollo: Apollo
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.user$ = new BehaviorSubject<User | null>(null);
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
      this.setItemToStorage('token', user.accessToken!.token);
      this.nextIsLoggedIn$(true);
      return user;
    } ));
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.nextUser$(null);
    this.removeItemFromStorage('token');
  }

  setItemToStorage(key: string, value: string): void{
    localStorage.setItem(key, value);
  }
  getItemFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  removeItemFromStorage(key: string): void {
     localStorage.removeItem(key);
  }

  nextIsLoggedIn$(value: boolean) {
    this.isLoggedIn$.next(value);
  }

  nextUser$(user: User | null) {
    this.user$.next(user);
  }

  handleError(error: HttpErrorResponse): HttpErrorResponse {
    this.httpError = error;
    return this.httpError;
  }
}
