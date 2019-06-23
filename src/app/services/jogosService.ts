import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Jogo } from '../model/jogo.model';
import { CrudService } from '../model/crudService.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class JogosService extends CrudService<Jogo> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.API}jogo`);
  }

}
