import { Plataforma } from "./plataforma.model";
import { Genero } from "./genero.model";
import { Jogo } from "./jogo.model";
import { Pessoa } from "./pessoa.model";

export class VitrineJogo {
  idpessoa: number
  idjogo: number
  preco: number
  vitrine: boolean
  jogo: Jogo
  pessoa: Pessoa
  constructor() { }
}
