import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CrudService } from '../model/crudService.model';
import { Genero } from '../model/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GeneroService extends CrudService<Genero>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}genero`);
  }

}
