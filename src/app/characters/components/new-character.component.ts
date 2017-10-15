import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as JWT from 'jwt-decode';

import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-new-characters',
  templateUrl: '../views/new-character.component.html',
  // styleUrls: ['./login.component.css']
})
export class NewCharacterComponent implements OnInit {
  newCharacterForm: FormGroup;
  servers: string[] = [
    'Agride', 'Beta test', 'Djaul', 'Écho', 'Goultard', 'Hel Munster', 'Illyazelle',
    'Julith', 'Mériana', 'Merkator', 'Mylaise', 'Nidas', 'Pandore', 'Ush'
  ];
  categories: string[] = [
    'Crâ', 'Ecaflip', 'Eliotrope', 'Eniripsa', 'Enutrof', 'Féca', 'Huppermage', 'Iop', 'Osamodas',
    'Ouginak', 'Pandawa', 'Roublard', 'Sacrieur', 'Sadida','Sram', 'Steamer', 'Xélor', 'Zobal'
  ];

  roles: string[] = [
  ];

  constructor(private fb: FormBuilder, private characterService: CharacterService) {}

  ngOnInit() {
    //Generate form
    this.newCharacterForm = this.fb.group({
      pseudo: ['', Validators.required],
      server: ['', Validators.required],
      role: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  addNewCharacter(): void {
    let auth_token = localStorage.getItem('auth_token');
    let currentUserId = JWT(auth_token)['sub'];

    let character: any = this.newCharacterForm.value;
    character.user_id = currentUserId;
    this.characterService.newCharacter(character).subscribe(
      data =>
    );
  }
}
