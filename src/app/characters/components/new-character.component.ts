import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JwtHelper } from 'angular2-jwt';
import { CharacterService } from '../../services/character.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Character } from '../../models/character';

@Component({
  selector: 'app-new-characters',
  templateUrl: '../views/new-character.component.html',
  // styleUrls: ['./login.component.css']
})
export class NewCharacterComponent implements OnInit {
  newCharacterForm: FormGroup;
  error: string = null;
  character: Character;

  servers: string[] = [
    'Agride', 'Beta test', 'Djaul', 'Écho', 'Goultard', 'Hel Munster', 'Illyazelle',
    'Julith', 'Mériana', 'Merkator', 'Mylaise', 'Nidas', 'Pandore', 'Ush'
  ];

  categories: string[] = [
    'Crâ', 'Ecaflip', 'Eliotrope', 'Eniripsa', 'Enutrof', 'Féca', 'Huppermage', 'Iop', 'Osamodas',
    'Ouginak', 'Pandawa', 'Roublard', 'Sacrieur', 'Sadida','Sram', 'Steamer', 'Xélor', 'Zobal'
  ];

  constructor(private jwtHelper: JwtHelper, private fb: FormBuilder, private characterService: CharacterService, private flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    this.newCharacterForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(33)]],
      server: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  onNewCharacterSubmit(): void {
    const userId: number = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub']
    let characterForm = this.newCharacterForm.value;
    characterForm.user_id = userId;
    this.characterService.createCharacter(characterForm).subscribe(
      data => {
        this.character = data;
        this.characterService.addCharacter(this.character);
      },
      () => {
        this.flashMessagesService.show('Nouveau personnage ajouté', {cssClass: 'notification is-success'})
        this.newCharacterForm.reset();
      }
    );
  }
}
