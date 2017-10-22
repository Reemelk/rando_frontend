import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { emailMatcher } from '../../../shared/validators/email-matcher';
import { RegisterService } from '../../../services/register.service';

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

  constructor(private router: Router, private registerService: RegisterService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(8), Validators.required]]
      }),
      repassword: ['', Validators.required]
    }, {Validator: emailMatcher});
  }

  //Validators
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('repassword').value ? null : {'mismatch': true};
  }

  //Event
  register(): void {
    let user: any = this.registerForm.get('user').value;
    this.registerService.register(user).subscribe(
      data => this.router.navigate(['/']),
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
