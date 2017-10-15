import { Component } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: '../views/character.component.html',
  // styleUrls: ['./login.component.css']
})
export class CharacterComponent {
  displayNewCharacterForm: boolean = false;
  levelAlert: string = 'is-active';

  constructor() {}

  toggleForm(): void {
    this.displayNewCharacterForm = !this.displayNewCharacterForm
  }

  closeAlert(): void {
    this.levelAlert = '';
  }
}
