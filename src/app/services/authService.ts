import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  private options

  constructor(private http: HttpClient) {
    this.options = { headers: this.getHeaders() };
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return headers;
  }


  login(auth) {
    //let auth = {
    //  cpf = cpfL,
    //  senha = senhaL
    //}
    return this.http.post<any>('https://locadora-pessoal.herokuapp.com/auth', auth, this.options)
  }

  teste() {
    return this.http.get<any>('http://172.17.105.161:3000/auth/google')
  }


}
