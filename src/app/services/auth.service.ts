import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {}

  login(user): Observable<boolean> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post('/api/auth', JSON.stringify({user}), options)
      .map((response: Response) => {
        let tk = response.json()['token'];
        if (tk) {
          this.token = tk;
          localStorage.setItem('auth_token', this.token);
          return true;
        } else {
          return false;
        }
      })
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }
}
