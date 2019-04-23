import { Plataforma } from "./plataforma.model";
import { Genero } from "./genero.model";

export class Jogo {
  idjogo: number
  nome: string
  anolancamento: Date
  urlimagem: string
  pontuacao: number
  generos: Genero[]
  plataformas: Plataforma[]
  constructor() { }
}
