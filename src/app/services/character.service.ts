import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class CharacterService {
  public newCharacterSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  getCharacters(userId: number) {
    return this.http.get('/api/characters/' + userId);
  }

  newCharacter(charaterData: any): Observable<boolean> {
    return this.http.post('/api/characters', JSON.stringify({character: charaterData}));
  }

  addCharacter(data) {
    this.newCharacterSubject.next(data);
  }
}
