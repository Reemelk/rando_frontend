import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as JWT from 'jwt-decode';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: string = null;
  levelAlert: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    //Remove localstorage
    this.authService.logout();
    //Generate form
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const user: Object = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(user).subscribe(
      data => {
        let auth_token = localStorage.getItem('auth_token');
        let currentUserId = JWT(auth_token)['sub'];
        this.router.navigate([`/players/${currentUserId}/characters`]);
      },
      err => {
        this.loginFailed = 'Email et/ou password incorrect';
      }
    );
  }

  closeAlert() {
    return this.levelAlert = false;
  }
}
