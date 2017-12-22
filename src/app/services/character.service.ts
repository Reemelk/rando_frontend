import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CharacterService {
  private newCharacterSubject = new Subject<any>();
  private updateCharacterFromListBehaviorSubject = new BehaviorSubject<any>(undefined);

  newCharacter$ = this.newCharacterSubject.asObservable();
  updateCharacterFromList$ = this.updateCharacterFromListBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCharacters(userId: number): Observable<any> {
    return this.http.get(`/api/characters/${userId}`);
  }

  createCharacter(charaterData: any): Observable<any> {
    return this.http.post('/api/characters', JSON.stringify({character: charaterData}));
  }

  updateCharacter(characterData: any): Observable<any> {
    return this.http.patch(`/api/characters/${characterData.id}`, JSON.stringify({character: characterData}));
  }

  deleteCharacter(characterId: number): Observable<any> {
    return this.http.delete(`/api/characters/${characterId}`);
  }

  addCharacter(data: any) {
    this.newCharacterSubject.next(data);
  }

  updateCharacterFromList(data: any) {
    this.updateCharacterFromListBehaviorSubject.next(data);
  }
}
