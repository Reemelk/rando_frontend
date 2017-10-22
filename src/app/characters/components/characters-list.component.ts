import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: '../views/characters-list.component.html',
  // styleUrls: ['./login.component.css']
})
export class CharactersListComponent implements OnInit {
  private userId;
  characters: any = [];

  constructor(private characterService: CharacterService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];

  }

  ngOnInit() {
    this.characterService.getCharacters(this.userId)
      .subscribe(resCharactersData => this.characters = resCharactersData);

    this.characterService.newCharacter$.subscribe(character => this.characters = [character, ...this.characters]);
  }
}
