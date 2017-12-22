import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { JwtHelper } from 'angular2-jwt';
import { LobbyService } from '../../services/lobby.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group',
  templateUrl: '../views/group.component.html',
  // styleUrls: ['./login.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  groupId: number;
  userId: number;
  group: Group;
  timerSubscription: Subscription;
  orgCount: number[];
  addLoading: string = '';

  constructor(private renderer: Renderer2, private lobbyService: LobbyService, private route: ActivatedRoute, private router: Router, private jwtHelper: JwtHelper) {
    this.groupId = +this.route.snapshot.params['id'];
    this.userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
  }

  ngOnInit() {
    let timer = Observable.timer(0, 7000);
    this.timerSubscription = timer.subscribe(() => {
      this.lobbyService.getGroup(this.groupId).subscribe(data => {
        this.group = data;
        this.orgCount = this.makeLoopGreatAgain(this.group.organizations_count);
        if (this.group.hasOwnProperty('users')) {
          this.timerSubscription.unsubscribe();
          this.lobbyService.updateTokenStatus(this.groupId).subscribe(data => this.setNewToken(data));
        }
      });
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  public onPlayerLeavingGroup(): void {
    this.addLoading = 'is-loading';
    this.lobbyService.updateGroup(this.groupId, this.userId, null).subscribe(
      data => {
        localStorage.setItem('auth_token', JSON.parse(data)['token']);
        this.router.navigate([`players/${this.userId}/search`]);
      }
    );
  }

  public onAdminGroupStatus(status: string): void {
    this.addLoading = 'is-loading';
    this.lobbyService.updateGroup(this.groupId, null, status).subscribe(
      data => localStorage.setItem('auth_token', JSON.parse(data)['token'])
    );
  }

  public setNewToken(str: string): void {
    if (str['token']) {
       localStorage.setItem('auth_token', str['token']);
     }
  }

  public areYouALeader(): boolean {
    return this.userId == this.group.user_leader ? true : false;
  }

  public makeLoopGreatAgain(size: number): number[] {
    let fArray: number[] = [];
    for(let i = 1; i <= size; ++i) {
      fArray.push(i);
    }
    return fArray;
  }
}
