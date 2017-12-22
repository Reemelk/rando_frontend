import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LobbyService {
  private groupsListSubject = new Subject<any>();
  private sizeGroupsListBehaviorSubject = new BehaviorSubject<boolean>(false);

  groupsList$ = this.groupsListSubject.asObservable();
  sizeGroupsList$ = this.sizeGroupsListBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getGroupsList(level: number, server: string, type: boolean): Observable<any> {
    return this.http.get(`/api/groups/type/${type}/srv/${server}/lvl/${level}`);
  }

  getGroup(groupId: number): Observable<any> {
    return this.http.get(`/api/groups/${groupId}`);
  }

  createGroup(groupData: string): Observable<any> {
    return this.http.post('/api/groups', JSON.stringify({group: groupData}));
  }

  updateGroup(groupId: number, userId?: number, status?: string): Observable<string> {
    return this.http.patch(`/api/groups/${groupId}`, JSON.stringify({user_id: userId, status: status}), {responseType: 'text'});
  }

  updateTokenStatus(groupId: number): Observable<any> {
    return this.http.get(`/api/update_token_statuses/${groupId}`)
  }

  addGroupsList(data: any) {
    this.groupsListSubject.next(data);
  }

  sizeGroupsList(data: boolean) {
    this.sizeGroupsListBehaviorSubject.next(data);
  }
}
