import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class CharacterService {
  private newCharacterSubject = new Subject<any>();

  newCharacter$ = this.newCharacterSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCharacters(userId: number) {
    return this.http.get('/api/characters/' + userId);
  }

  newCharacter(charaterData: any): Observable<any> {
    return this.http.post('/api/characters', JSON.stringify({character: charaterData}))
  }

  addCharacter(data: any) {
    this.newCharacterSubject.next(data);
  }
}
