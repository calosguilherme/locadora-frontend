import { Plataforma } from "./plataforma.model";
import { Genero } from "./genero.model";
import { Pessoa } from './pessoa.model';

export class PessoaJogo {
  idpessoa: number
  idjogo: number
  preco: number
  vitrine: boolean
  pessoa: Pessoa
  constructor() { }
}
