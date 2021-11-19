import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../user/user';
import { Apollo, gql } from 'apollo-angular';
import {Router} from '@angular/router';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;
  isLoggedIn = false;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
  }

   login(email: string, password: string): Observable<boolean>{
    const login = gql`
      mutation Login($email: String!, $password: String!) {
        login(input: {
          email: $email,
          password: $password
        }){
          email
          name
          picture
          accessToken {
            token
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: login,
      variables: {
        email,
        password
      }
    }).pipe(map( ({data}) => {
      // @ts-ignore
        this.user = data.login as User;
        this.setItemToStorage('token', this.user.accessToken.token).then();
        return this.isLoggedIn = true;
    } ));
  }

  logout(): Promise<void> {
    this.isLoggedIn = false;
    this.user = {email: '', name: '', picture: ''};
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

  handleError(error: HttpErrorResponse): HttpErrorResponse {
    this.httpError = error;
    return this.httpError;
  }
}
