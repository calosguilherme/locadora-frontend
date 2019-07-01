import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CrudService } from '../model/crudService.model';
import { PessoaJogo } from '../model/pessoajogo.model';
import { take, delay } from 'rxjs/operators';
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

  getAll(filtros?) {
    return this.http.get<VitrineJogo[]>(`${environment.API}pessoajogo/`, { params: filtros })
      .pipe(
        delay(2000)
      );
  }

  getRecomendacao(id) {
    return this.http.get<Jogo[]>(`${environment.API}recomendacao/${id}`).pipe(take(1));
  }

  removeJogo(idpessoa, idjogo) {
    return this.http.delete<any>(`${environment.API}pessoajogo/${idpessoa}/${idjogo}`).pipe(take(1));
  }


}
