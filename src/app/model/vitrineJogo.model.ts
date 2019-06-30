import { Jogo } from "./jogo.model";


enum Status {
  ativo = 0,
  inativo = 1,
}

export class VitrineJogo {
  idpessoa: number
  idjogo: number
  preco: number
  vitrine: boolean
  jogo: Jogo
  status: Status
  constructor() { }
}
