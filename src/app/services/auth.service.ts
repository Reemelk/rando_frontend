import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(user): Observable<any> {
    return this.http.post('/api/auth', JSON.stringify({user}));
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
