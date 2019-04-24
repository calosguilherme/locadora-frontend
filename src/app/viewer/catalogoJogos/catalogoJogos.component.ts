import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Jogo } from 'src/app/model/jogo.model';
import { Genero } from 'src/app/model/genero.model';


@Component({
  selector: 'app-home',
  templateUrl: './catalogoJogos.component.html',
  styleUrls: ['./catalogoJogos.component.css']
})
export class CatalogoJogosComponent implements OnInit {
  public plataformas: Plataforma[]
  public jogos: Jogo[]
  public generos: Genero[]
  public pesquisarNome: string

  constructor(
    private jogosService: JogosService,

  ) {  }

  ngOnInit() {
    this.jogosService.getPlataformas().subscribe(plataformas => this.plataformas = plataformas)
    this.pegaJogos()
    this.jogosService.getGeneros().subscribe(generos => this.generos = generos)
  }
  pegaJogos(nome='') {
    this.jogosService.getJogosNome(nome).subscribe(jogos => this.jogos = jogos)
  }

}
