import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Plataforma } from '../model/plataforma.model';
import { Genero } from '../model/genero.model';
import { Jogo } from '../model/jogo.model';

@Injectable()
export class JogosService {
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

  getGeneros() {
    return this.http.get<Genero[]>('https://locadora-pessoal.herokuapp.com/genero')
  }

  getPlataformas() {
    return this.http.get<Plataforma[]>('https://locadora-pessoal.herokuapp.com/plataforma')
  }

  getJogosNome(nome?: string) {
    if (nome == '') return this.http.get<Jogo[]>('https://locadora-pessoal.herokuapp.com/jogo/'+ nome)
    else return this.http.get<Jogo[]>('https://locadora-pessoal.herokuapp.com/jogo/'+nome+'/0')

  }

}
