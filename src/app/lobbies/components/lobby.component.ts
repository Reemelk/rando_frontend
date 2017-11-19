import { Component, DoCheck } from '@angular/core';

import { DisplayComponentService } from './../display-component.service';

@Component({
  selector: 'app-lobby',
  templateUrl: '../views/lobby.component.html',
  // styleUrls: ['./login.component.css']
})
export class LobbyComponent implements DoCheck {
  displayTemplate: boolean = false;

  constructor(private displaycptService: DisplayComponentService) {}

  ngDoCheck() {
    this.displaycptService.StateListLobby$.subscribe(state => this.displayTemplate = state);
  }

  public isLobbyInPending(): boolean {
    let gstatus = JSON.parse(localStorage.getItem('grp_status'));
    return gstatus ? true : false;
  }
}
