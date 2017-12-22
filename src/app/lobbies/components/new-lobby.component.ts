import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { LobbyService } from '../../services/lobby.service';
import { Group } from '../../models/group';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-new-lobby',
  templateUrl: '../views/new-lobby.component.html',
  // styleUrls: ['./login.component.css']
})
export class NewLobbyComponent implements OnInit {
  newGroupForm: FormGroup;
  userId: number;
  groupId: number;
  group: any;

  servers: string[] = [
    'Agride', 'Beta test', 'Djaul', 'Écho', 'Goultard', 'Hel Munster', 'Illyazelle',
    'Julith', 'Mériana', 'Merkator', 'Mylaise', 'Nidas', 'Pandore', 'Ush'
  ];

  constructor(private flashMessagesService: FlashMessagesService, private jwtHelper: JwtHelper, private lobbyService: LobbyService, private fb: FormBuilder, private router: Router) {
    this.userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
  }

  ngOnInit() {
    this.newGroupForm = this.fb.group({
      name: ['', Validators.required],
      minp: ['', Validators.required],
      maxp: ['', Validators.required],
      levelp: ['', Validators.required],
      range: ['', Validators.required],
      server: ['', Validators.required],
      fight_type: ['', Validators.required]
    });
  }

  public onNewGroupSubmit(): void {
    this.group = this.newGroupForm.value;
    this.group['user_leader'] = this.userId;
    this.lobbyService.createGroup(this.group).subscribe(
      data => {
        localStorage.setItem('auth_token', data['token']);
        this.groupId = data['group_id'];
      },
      error => this.flashMessagesService.show('Un problème est survenu lors de la création du groupe.', {cssClass: 'notification is-danger'}),
      () => this.router.navigate([`/players/${this.userId}/groups/${this.groupId}`])
    );
  }
}
