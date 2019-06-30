import { Pessoa } from './pessoa.model';


enum Status {
  ativo = 0,
  inativo = 1,
}

export class PessoaJogo {
  idpessoa: number
  idjogo: number
  preco: number
  vitrine: boolean
  pessoa: Pessoa
  status: Status
  constructor() { }
}
