import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {hostApi} from '../config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;
  loginMessage = 'Login';
  apiUrl = `${hostApi}/auth`;
  isLoggedIn = false;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;
  masterToken = '';

  constructor(private apollo: Apollo) {
  }

  login(email: string, password: string): Observable<boolean>{

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    //   })
    // };
    //
    // const body = new HttpParams().set('access_token', this.masterToken);

    // return this.http.post<any>(this.apiUrl, body.toString(), httpOptions)
    //   .pipe(map(res => {
    //       if (res.token){
    //         this.user = {username: res.user.name};
    //         this.isLoggedIn = true;
    //         this.loginMessage = `Account ${this.user.username}`;
    //       }
    //       return this.isLoggedIn;
    //     })
    //   );
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
    // this.user = {username: ''};
    // this.isLoggedIn = false;
    // this.loginMessage = `Login`;
  }

  handleError(error: HttpErrorResponse): HttpErrorResponse {
    this.httpError = error;
    return this.httpError;
  }
}
