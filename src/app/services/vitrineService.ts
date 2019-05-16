import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VitrineJogo } from '../model/vitrineJogo.model';

@Injectable()
export class VitrineService {
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

  getJogosVitrine() {
    return this.http.get<VitrineJogo[]>('https://locadora-pessoal.herokuapp.com/pessoajogo')
  }


}
