import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Jogo } from 'src/app/model/jogo.model';
import { Genero } from 'src/app/model/genero.model';
import { GeneroService } from 'src/app/services/generoService';
import { PlataformaService } from 'src/app/services/plataformaService';


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
  public modalJogo: Jogo
  public sucRequi: boolean = false
  public filtros = {
     jogo: '', 
     genero: [],
     plataforma: [],
  }
  public camposPlata = []
  public camposGen =[]

  constructor(
    private jogosService: JogosService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,

  ) {  }

  ngOnInit() {
    this.plataformaService.getComFiltros({ status: 0 }).subscribe(plataformas => this.plataformas = plataformas)
    this.pegaJogos()
    this.generoService.getComFiltros({status: 0}).subscribe(generos => this.generos = generos)
  }
  pegaJogos(filtro?) {
    this.jogosService.getComFiltros(filtro).subscribe(jogos => {
      this.jogos = jogos
      this.sucRequi = true
    })
  }


  ordenaJogos(i) {
    switch (i) {
      case '0': {
        this.jogosOrdemId()
        break;
      }
      case '1': {
        this.jogosOrdemAlfabetica()
        break;
      }
      case '2': {
        this.jogosOrdemMaisRecente()
        break;
      }
    }
  }

  jogosOrdemAlfabetica() {
    this.jogos = this.jogos.sort(function (a, b) {
      if (a.nome > b.nome) {
        return 1;
      }
      if (a.nome < b.nome) {
        return -1;
      }
      return 0;
    });
  }

  jogosOrdemId() {
    this.jogos = this.jogos.sort(function (a, b) {
      if (a.idjogo > b.idjogo) {
        return 1;
      }
      if (a.idjogo < b.idjogo) {
        return -1;
      }
      return 0;
    });
  }


  jogosOrdemMaisRecente() {
    this.jogos = this.jogos.sort(function (a, b) {
      if (a.anolancamento < b.anolancamento) {
        return 1;
      }
      if (a.anolancamento > b.anolancamento) {
        return -1;
      }
      return 0;
    });
  }

  getPlataforma(nome) {
    this.sucRequi = false
    if (this.filtros.plataforma.find(x => x == nome)) {
      this.filtros.plataforma = this.filtros.plataforma.filter(x => x != nome)
    }
    else {
      this.filtros.plataforma.push(nome)
    }
    this.pegaJogos(this.filtros)
  }
  getGenero(nome) {
    this.sucRequi = false
    if (this.filtros.genero.find(x => x == nome)) {
      this.filtros.genero = this.filtros.genero.filter(x => x != nome)
    }
    else {
      this.filtros.genero.push(nome)
    }
    this.pegaJogos(this.filtros)
  }

  selecionaJogo(jogo) {
    this.modalJogo = jogo
  }

  limpar() {
    this.sucRequi = false
    this.camposPlata = []
    this.camposGen = []
    this.filtros = {
      jogo: '',
      genero: [],
      plataforma: [],
    }
    this.pegaJogos()
  }

}
