import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pessoa } from '../model/pessoa.model';
import { CrudService } from '../model/crudService.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PessoaService extends CrudService<Pessoa>{


  constructor(protected http: HttpClient) {
    super(http, `${environment.API}pessoa`);
  }



}
