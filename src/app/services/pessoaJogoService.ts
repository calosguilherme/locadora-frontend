import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CrudService } from '../model/crudService.model';
import { PessoaJogo } from '../model/pessoajogo.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaJogoService extends CrudService<PessoaJogo>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}pessoajogo`);
  }

}
