import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { LobbyService } from '../../services/lobby.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-list-lobby',
  templateUrl: '../views/list-lobby.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // styleUrls: ['./login.component.css']
})
export class ListLobbyComponent implements OnInit {
  groups: Group[] = [];
  errorMessage: string = null;

  constructor(private router: Router, private jwtHelper: JwtHelper, private lobbyService: LobbyService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.lobbyService.groupsList$.subscribe(
      resGroupsData => {
        this.groupsEmptied(); //reset groups
        this.groups = this.groups.concat(resGroupsData);
        this.cd.markForCheck();
      }
    );
  }

  public onJoinLobbySubmit(group_id: number) {
    const userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
    const groupId = group_id;
    this.lobbyService.updateGroup(groupId, userId).subscribe(
      data => localStorage.setItem('auth_token', JSON.parse(data)['token']),
      error => {
        if (error.status == 423) {
          this.errorMessage = 'Ce groupe a atteint le maximum de joueur.';
        } else {
          this.errorMessage = 'Vous êtes déjà dans un groupe.';
        }
        this.cd.markForCheck();
      },
      () => this.router.navigate([`players/${userId}/groups/${groupId}`])
    );
  }

  public displayListLobby(): boolean {
    return this.groups.length == 0 ? false : true;
  }

  public groupsEmptied(): void {
    this.groups = [];
  }
}
