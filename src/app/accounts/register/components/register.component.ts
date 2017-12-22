import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidation } from '../../../shared/validators/email-matcher';
import { RegisterService } from '../../../services/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: '../views/register.component.html',
  // styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  titleAlert: string = 'This field is required';
  usernameUniquess: string = null;
  emailUniqueness: string = null;

  constructor(private router: Router, private registerService: RegisterService, private fb: FormBuilder, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }),
      repassword: ['', Validators.required]
    }, {validator: PasswordValidation.MatchPassword});
  }

  register(): void {
    let user: any = this.registerForm.get('user').value;
    this.registerService.register(user).subscribe(
      data => {
        this.flashMessagesService.show('Vous avez été inscrit avec succès.', {cssClass: 'notification is-success'})
        this.router.navigate(['']);
      },
      err => {
        if (err["errors"]["username"] == "has already been taken") {
          this.usernameUniquess = 'Cette username est déjà utilisé.';
        }
        if (err["errors"]["email"] == "has already been taken") {
          this.emailUniqueness = 'Cette email est déja utilisé.';
        }
      }
    );
  }
}
