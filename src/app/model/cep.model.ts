import { Bairro } from './bairro.model';

export class Cep {
  numero: number;
  bairro: Bairro;
  constructor() {
    this.bairro = new Bairro()
  }
}
