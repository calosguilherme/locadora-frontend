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

  postPlataforma(plataforma: Plataforma) {
    console.log(plataforma)
    return this.http.post<Plataforma>('https://locadora-pessoal.herokuapp.com/plataforma', plataforma, this.options)
  }


  removePlataforma(id: number) {
    let idP = { idplataforma: id }
    return this.http.post<Jogo>('https://locadora-pessoal.herokuapp.com/plataforma/remove', idP, this.options)
  }

  getJogos(filtros?) {
    return this.http.get<Jogo[]>('https://locadora-pessoal.herokuapp.com/jogo', { params: filtros})

  }


  removeJogo(id: number) {
    let idJ = { idjogo: id }
    return this.http.post<Jogo>('https://locadora-pessoal.herokuapp.com/jogo/remove', idJ, this.options)
  }

  postJogo(jogo: Jogo) {
    return this.http.post<Jogo>('https://locadora-pessoal.herokuapp.com/jogo', jogo, this.options)
  }

}
