import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) {}

  login(user): Observable<boolean> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post('/api/auth', JSON.stringify({user}), options)
      .map((response: Response) => {
        let tk = response.json()['token'];
        if (tk) {
          localStorage.setItem('auth_token', tk);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): boolean {
    if (localStorage.getItem('auth_token')) {
      localStorage.removeItem('auth_token');
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired('auth_token');
  }
}
