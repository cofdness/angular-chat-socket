import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../user/user';
import { Apollo, gql } from 'apollo-angular';
import {Router} from '@angular/router';

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
    }).pipe(map(({data}) => {
      // @ts-ignore
        this.user = data.login as User;
        localStorage.setItem('token', this.user.accessToken.token);
        return this.isLoggedIn = true;
    } ));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.user = {email: '', name: '', picture: ''};
    this.router.navigate(['login']).then();
  }

  handleError(error: HttpErrorResponse): HttpErrorResponse {
    this.httpError = error;
    return this.httpError;
  }
}
