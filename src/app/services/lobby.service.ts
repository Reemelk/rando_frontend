import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

  getGroup(groupId: any): Observable<any> {
    return this.http.get(`/api/groups/${groupId}`);
  }

  createGroup(groupData: any): Observable<any> {
    return this.http.post('/api/groups', JSON.stringify({group: groupData}));
  }

  updateGroup(groupId: number, userId?: number, status?: number): Observable<string> {
    return this.http.patch(`/api/groups/${groupId}`, JSON.stringify({user_id: userId, status: status}), {responseType: 'text'});
  }
}
