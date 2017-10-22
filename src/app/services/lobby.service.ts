import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LobbyService {
  private groupsListSubject = new Subject<any>();

  groupsList$ = this.groupsListSubject.asObservable();

  constructor(private http: HttpClient) {}

  getGroupsList(level: number, server: string, type: boolean): Observable<any> {
    return this.http.get(`/api/groups/type/${type}/srv/${server}/lvl/${level}`);
  }

  addGroupsList(data) {
    this.groupsListSubject.next(data);
  }
}
