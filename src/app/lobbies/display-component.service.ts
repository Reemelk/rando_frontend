import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DisplayComponentService {
  private stateListLobbySource = new Subject<boolean>();

  StateListLobby$ = this.stateListLobbySource.asObservable();

  getState(state: boolean) {
    this.stateListLobbySource.next(state);
  }
}
