import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthServiceLocadora {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  private options

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.options = { headers: this.getHeaders() };
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return headers;
  }


  login(auth) {
    return this.http.post<any>('https://locadora-pessoal.herokuapp.com/auth', auth, this.options)
  }

  checaEmail(mail) {
    let auth = { 'email': mail }
    return this.http.post<any>('https://locadora-pessoal.herokuapp.com/auth/email', auth, this.options)
  }

  logout() {
    this.cookieService.deleteAll()
  }

  teste() {
    return this.http.get<any>('https://locadora-pessoal.herokuapp.com/auth/google')
  }

  salvacookie(pessoa: any) {
    var dt = new Date();
    dt.setHours(dt.getHours() + 2);
    if (pessoa.numeroregistro) {
      this.cookieService.set('numeroregistro', pessoa.numeroregistro.toString(), dt)
      this.cookieService.set('idpessoa', pessoa.pessoa.idpessoa.toString(), dt)
      this.cookieService.set('nome', pessoa.pessoa.nome, dt)
      this.cookieService.set('urlimagem', pessoa.pessoa.urlimagem, dt)
      this.cookieService.set('cpf', pessoa.pessoa.cpf.toString(), dt)
      return
    }
    this.cookieService.set('idpessoa', pessoa.idpessoa.toString(), dt)
    this.cookieService.set('nome', pessoa.nome.toString(), dt)
    this.cookieService.set('urlimagem', pessoa.urlimagem.toString(), dt)
    this.cookieService.set('cpf', pessoa.cpf.toString(), dt)
    
  }

  salvacookieFacebook(facebook) {

  }

}
