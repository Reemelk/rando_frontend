import { Component, OnInit } from '@angular/core';

import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: '../views/lobby.component.html',
  // styleUrls: ['./login.component.css']
})
export class LobbyComponent {
  showNewLobby: boolean = false;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbyService.sizeGroupsList$.subscribe(data => this.showNewLobby = data);
  }
}
