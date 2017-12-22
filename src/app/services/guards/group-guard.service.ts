import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class GroupGuardService implements CanActivate {
  constructor(private jwtHelper: JwtHelper, private router: Router) {}

  canActivate(): boolean {
    const userId = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['sub'];
    const isOngoingGroup = this.jwtHelper.decodeToken(localStorage.getItem('auth_token'))['ongoing_g'];
    if (isOngoingGroup) {
      this.router.navigate([`/players/${userId}/characters`]);
      return false;
    }
    return true;
  }
}
