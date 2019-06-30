import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CrudService } from '../model/crudService.model';
import { PessoaJogo } from '../model/pessoajogo.model';
import { take } from 'rxjs/operators';
import { VitrineJogo } from '../model/vitrineJogo.model';
import { Jogo } from '../model/jogo.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaJogoService extends CrudService<PessoaJogo>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}pessoajogo`);

  }

  getById(id) {
    return this.http.get<VitrineJogo[]>(`${environment.API}pessoajogo/${id}`).pipe(take(1));
  }

  getRecomendacao(id) {
    return this.http.get<Jogo[]>(`${environment.API}recomendacao/${id}`).pipe(take(1));
  }


}
