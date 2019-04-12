import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pessoa } from '../model/pessoa.model';

@Injectable()
export class PessoaService {
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

  postPessoa(pessoa: Pessoa) {
    return this.http.post<Pessoa>('https://locadora-pessoal.herokuapp.com/pessoa', pessoa, this.options)
  }

}
