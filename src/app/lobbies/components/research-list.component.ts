import { Component, OnInit } from '@angular/core';

import { LobbyService } from '../../services/lobby.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-research-list',
  templateUrl: '../views/research-list.component.html',
  // styleUrls: ['./login.component.css']
})
export class ResearchListComponent implements OnInit {
  groups: Group[] = [];

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.lobbyService.groupsList$.subscribe(resGroupsData => this.groups = this.groups.concat(resGroupsData));
  }
}
