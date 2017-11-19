import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class GroupGuardService implements CanActivate {

  constructor(private jwtHelper: JwtHelper, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    const userId = this.jwtHelper.decodeToken(token)['sub'];
    const isOngoingGroup = this.jwtHelper.decodeToken(token)['ongoing_g'];
    if (isOngoingGroup) {
      this.router.navigate([`/players/${userId}/characters`]);
      return false;
    }
    return true;
  }
}
