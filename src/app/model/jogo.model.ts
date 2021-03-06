import { Plataforma } from "./plataforma.model";
import { Genero } from "./genero.model";

enum Status {
  ativo = 0,
  inativo = 1,
}

export class Jogo {
  idjogo: number
  nome: string
  descricao: string
  anolancamento: Date
  urlimagem: string
  classificacao: string
  multiplayer: boolean
  produtora: string
  pontuacao: number
  genero: Genero[]
  plataforma: Plataforma[]
  status: Status
  constructor() { }
}
