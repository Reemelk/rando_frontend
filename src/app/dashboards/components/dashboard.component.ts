import { Component, OnInit } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../views/dashboard.component.html',
  //styleUrls: ['../../../assets/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: number;
  currentGroup: number;

  constructor(private jwtHelper: JwtHelper, private userService: UserService) {}

  ngOnInit() {
    this.userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
    if (this.areYouOngoingGroup()) {
      this.userService.getCurrentGroupUser(this.userId).subscribe(data => this.currentGroup = data['current_group']);
    }
  }

  public areYouOngoingGroup(): boolean {
    let ongoing = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['ongoing_g'];
    return ongoing ? true : false;
  }
}
