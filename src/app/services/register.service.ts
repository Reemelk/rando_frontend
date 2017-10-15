import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterService {

  constructor(private http: Http) {}

  register(data: any): Observable<boolean> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post('/api/register', JSON.stringify({user: data}), options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err:Response) => {
        let details = err.json();
        return Observable.throw(details);
      });
  }

  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body = err.json() || '';
      errMessage = `${body}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }
}
