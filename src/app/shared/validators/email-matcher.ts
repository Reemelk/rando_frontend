import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(ac: AbstractControl) {
    let password = ac.get(['user', 'password']).value;
    let repassword = ac.get('repassword').value;
    if (password != repassword) {
      console.log('false');
      ac.get('repassword').setErrors({MatchPassword: true})
    } else {
      console.log('true');
      return null;
    }
  }
}
