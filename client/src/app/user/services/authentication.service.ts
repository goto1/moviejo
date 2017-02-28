import { Injectable }         from '@angular/core';
import {
  Http, Headers,
  Response, RequestOptions }  from '@angular/http';
import { 
  AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Observable }         from 'rxjs/Observable';
import { 
  ILoginForm, IRegisterForm, 
  IMovie }                    from '../../shared/interfaces';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http, private authHttp: AuthHttp) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  register(formData: IRegisterForm): Observable<boolean | Error> {
    const url: string = 'https://gentle-tor-88697.herokuapp.com/api/register';

    return this.request(formData, url);
  }

  login(formData: ILoginForm): Observable<boolean | Error> {
    const url: string = 'https://gentle-tor-88697.herokuapp.com/api/login';

    return this.request(formData, url);
  }

  logout(): void {
    localStorage.removeItem('id_token');
  }

  loggedIn(): boolean {
    return tokenNotExpired();
  }

  private request(data, url): Observable<boolean | Error> {
    return this.http.post(url, data, this.options)
      .map((res: Response) => {
        const data = res.json() || {};

        if (!data.token) {
          return false;
        }

        localStorage.setItem('id_token', data.token);
        return true;
      })
      .catch(err => this.handleError(err));
  }

  private handleError(err: any): Observable<Error> {
    let errorMessage: string = 'Something went wrong';
    const body = err.json() || {};

    if (body.message) {
      errorMessage = body.message;
    }

    return Observable.throw(errorMessage);
  }
}