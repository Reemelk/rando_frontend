import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-characters-list',
  templateUrl: '../views/characters-list.component.html',
  // styleUrls: ['./login.component.css']
})
export class CharactersListComponent implements OnInit {
  updateLevelCharacterForm: FormGroup;
  characters: Character[] = [];
  userId: number;
  showModal: string = '';

  constructor(private fb: FormBuilder, private characterService: CharacterService, private route: ActivatedRoute, private flashMessagesService: FlashMessagesService) {
    this.userId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.updateLevelCharacterForm = this.fb.group({
      level: [0, Validators.required]
    });
    this.characterService.getCharacters(this.userId).subscribe(resCharactersData => this.characters = resCharactersData);
    this.characterService.newCharacter$.subscribe(character => this.characters = [character, ...this.characters]);
  }

  public onUpdateCharacterSubmit(): void {
    let new_level = this.updateLevelCharacterForm.get('level').value;
    let new_character: Character;
    this.characterService.updateCharacterFromList$.subscribe(data => new_character = data);
    new_character.level = new_level;
    this.characterService.updateCharacter(new_character).subscribe(
      data => {
        this.toggleForm();
        this.flashMessagesService.show(`Vous avez modifié le niveau du personnage ${new_character.pseudo}`, {cssClass: 'notification is-warning', timeout: 3000});
      }
    );
  }

  public onDeleteCharacterSubmit(character: Character): void {
    let character_index = this.characters.indexOf(character);
    this.characterService.deleteCharacter(character.id).subscribe(
      () => {
        this.characters.splice(character_index, 1);
        this.flashMessagesService.show('Le personnage a été supprimé avec succès.', {cssClass: 'notification is-warning', timeout: 3000});
      }
    );
  }

  public showUpdateCharacterModal(character: Character): void {
    this.toggleForm();
    this.updateLevelCharacterForm.patchValue({level: character.level});
    this.characterService.updateCharacterFromList(character);
  }

  public toggleForm(): void {
    (this.showModal == '') ? (this.showModal = 'is-active') : (this.showModal = '');
  }
}
