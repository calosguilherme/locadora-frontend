import { Plataforma } from "./plataforma.model";
import { Genero } from "./genero.model";

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
  constructor() { }
}
