import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post('/api/register', JSON.stringify({user: data}))
      // .map((response: Response) => {
      //   if (response) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // })
      // .catch((err:Response) => {
      //   let details = err.json();
      //   return Observable.throw(details);
      // });
  }

  // private handleError(err) {
  //   let errMessage: string;
  //
  //   if (err instanceof Response) {
  //     let body = err.json() || '';
  //     errMessage = `${body}`;
  //   } else {
  //     errMessage = err.message ? err.message : err.toString();
  //   }
  //   return Observable.throw(errMessage);
  // }
}
