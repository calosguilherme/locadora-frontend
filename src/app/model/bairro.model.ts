import { Municipio } from './municipio.model';

export class Bairro {
  idbairro: number;
  nome: string;
  municipio: Municipio
  constructor() {
    this.municipio = new Municipio()
  }
}
