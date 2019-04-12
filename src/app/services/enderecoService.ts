import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pessoa } from '../model/pessoa.model';

@Injectable()
export class EnderecoService {
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

  getCep(cep: number) {
    this.apenasNumeros(cep)
    console.log(this.apenasNumeros(cep))
    return this.http.get<number>('https://viacep.com.br/ws/' +cep+ '/json/')
  }

  apenasNumeros(campo) {
    campo = campo.replace(/[^0-9]/g, '');
    return campo;
  }

}

