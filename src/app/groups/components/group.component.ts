import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { JwtHelper } from 'angular2-jwt';
import { LobbyService } from '../../services/lobby.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group',
  templateUrl: '../views/group.component.html',
  // styleUrls: ['./login.component.css']
})
export class GroupComponent implements OnInit {
  private groupId: number;
  group: Group;
  users: any[] = [];

  constructor(private lobbyService: LobbyService, private route: ActivatedRoute, private router: Router, private jwtHelper: JwtHelper) {
    this.groupId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    IntervalObservable.create(7000).subscribe(() => {
      this.lobbyService.getGroup(this.groupId).subscribe(
        data => {
          this.group = data[0];
          this.users = data[1];
        }
      );
    });
  }

  onStatusGroupSubmitBtn(status: number): void {
    this.lobbyService.updateGroup(this.groupId, undefined, status).subscribe(
      data => localStorage.setItem('auth_token', JSON.parse(data)['token']),
      error => console.log(error),
      () => {
        const userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
        this.router.navigate([`/players/${userId}/search`]);
      }
    );
  }

  onLeaveGroupSubmitBtn(): void {
    const userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
    this.lobbyService.updateGroup(this.groupId, userId).subscribe(
      data => localStorage.setItem('auth_token', JSON.parse(data)['token']),
      error => console.log(error),
      () => this.router.navigate([`/players/${userId}/search`])
    );
  }

  public areYouALeader(): boolean {
    const userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
    return userId == this.group.user_leader ? true : false;
  }
}
