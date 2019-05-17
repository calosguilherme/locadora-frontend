import { Plataforma } from "./plataforma.model";
import { Genero } from "./genero.model";

export class Jogo {
  idjogo: number
  nome: string
  anolancamento: Date
  urlimagem: string
  pontuacao: number
  genero: Genero[]
  plataforma: Plataforma[]
  constructor() { }
}
