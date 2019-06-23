import { Estado } from './estado.model';

export class Municipio {
  idmunicipio: number;
  nome: string;
  estado: Estado;
  constructor() {
    this.estado = new Estado()
  }
}
