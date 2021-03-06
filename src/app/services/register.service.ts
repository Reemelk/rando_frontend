import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post('/api/register', JSON.stringify({user: data}));
  }
}
