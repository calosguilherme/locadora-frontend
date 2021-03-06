import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CrudService } from '../model/crudService.model';
import { Plataforma } from '../model/plataforma.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService extends CrudService<Plataforma>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}plataforma`);
  }

}
