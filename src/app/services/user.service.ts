import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentGroupUser(userId: number): Observable<any> {
    return this.http.get(`/api/current_group/${userId}`);
  }
}
