import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Municipio } from '../model/municipio.model';
import { Estado } from '../model/estado.model';
import { Bairro } from '../model/bairro.model';

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

  getAllMunicipio() {
    return this.http.get<Municipio[]>('https://locadora-pessoal.herokuapp.com/municipio/')
  }

  getAllEstado() {
    return this.http.get<Estado[]>('https://locadora-pessoal.herokuapp.com/estado/')
  }

  getAllBairro() {
    return this.http.get<Bairro[]>('https://locadora-pessoal.herokuapp.com/bairro/')
  }



  apenasNumeros(campo) {
    campo = campo.replace(/[^0-9]/g, '');
    return campo;
  }

}

