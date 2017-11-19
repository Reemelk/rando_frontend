import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JwtHelper } from 'angular2-jwt';
import { CharacterService } from '../../services/character.service';
import { LobbyService } from '../../services/lobby.service';

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-sidebar',
  templateUrl: '../views/character-sidebar.component.html',
  // styleUrls: ['./login.component.css']
})
export class CharacterSidebarComponent implements OnInit {
  characterTypesForm: FormGroup;
  characters: Character[] = [];

  constructor(private fb: FormBuilder, private characterService: CharacterService, private lobbyService: LobbyService, private jwtHelper: JwtHelper) {}

  ngOnInit() {
    this.characterTypesForm = this.fb.group({
      fight_type: ['', Validators.required]
    });
    const userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];

    this.characterService.getCharacters(userId)
      .subscribe(resCharacterData => this.characters = this.characters.concat(resCharacterData));
  }

  onResearchListButton(level: number, server: string): void {
    let type = this.characterTypesForm.value.fight_type;

    this.lobbyService.getGroupsList(level, server, type)
      .subscribe(data => this.lobbyService.addGroupsList(data));
  }
}
