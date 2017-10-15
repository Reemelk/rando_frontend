import { AbstractControl } from '@angular/forms';

export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const email = control.get(['user','email']);
  const repassword = control.get('repassword');
  if (!email || !repassword) return null;
  return email.value === repassword.value ? null : {nomatch: true};
};
