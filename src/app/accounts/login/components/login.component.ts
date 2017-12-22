import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    let user = this.loginForm.value;
    this.authService.login(user).subscribe(
      data => localStorage.setItem('auth_token', data['token']),
      err => this.flashMessagesService.show('Email et/ou password incorrect', {cssClass: 'notification is-danger', timeout: 3500}),
      () => {
        this.flashMessagesService.show('Vous êtes authentifié avec succès.', {cssClass: 'notification is-success'})
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
