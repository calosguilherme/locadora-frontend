import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PessoaJogoService } from 'src/app/services/pessoaJogoService';
import { CookieService } from 'ngx-cookie-service';
import { GeneroService } from 'src/app/services/generoService';
import { PlataformaService } from 'src/app/services/plataformaService';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Genero } from 'src/app/model/genero.model';
import { Jogo } from 'src/app/model/jogo.model';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  menuSelect: string = '0'
  active: boolean = false
  pessoaJogo: Jogo[]
  user: any = this.cookieService.getAll()
  sucRequi: boolean = false
  plataformas: Plataforma[]
  generos: Genero[]
  editPessoaJogo: boolean = false
  origi: Jogo[]
  modalJogo: Jogo
  preco: number
  public filtros = {
    status: 0,
    jogo: '',
    genero: [],
    plataforma: [],
  }

  constructor(
    private pessoaJogoService: PessoaJogoService,
    private cookieService: CookieService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
  ) {  }

  ngOnInit() {
    this.getPessoaJogo()
    this.plataformaService.getComFiltros({ status: 0 }).subscribe(plataformas => this.plataformas = plataformas)
    this.generoService.getComFiltros({ status: 0 }).subscribe(generos => this.generos = generos)
  }

  getPessoaJogo() {
    this.pessoaJogoService.getRecomendacao(this.user.idpessoa).subscribe(pessoaJogo => {
      console.log(pessoaJogo)
      this.pessoaJogo = pessoaJogo
      this.origi = pessoaJogo
      this.sucRequi = true
      this.aplicaFiltros()
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
    }
  }

  jogosOrdemAlfabetica() {
    this.pessoaJogo = this.pessoaJogo.sort(function (a, b) {
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
    this.pessoaJogo = this.pessoaJogo.sort(function (a, b) {
      if (a.idjogo > b.idjogo) {
        return 1;
      }
      if (a.idjogo < b.idjogo) {
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
    this.aplicaFiltros()
    this.sucRequi = true
  }

  getGenero(nome) {
    this.sucRequi = false
    if (this.filtros.genero.find(x => x == nome)) {
      this.filtros.genero = this.filtros.genero.filter(x => x != nome)
    }
    else {
      this.filtros.genero.push(nome)
    }
    this.aplicaFiltros()
    this.sucRequi = true
  }

  aplicaFiltros() {
    if (this.filtros.plataforma.length != 0) {
      for (let filtro of this.filtros.plataforma) {
        this.pessoaJogo = this.origi.filter(x => x.plataforma.find(y => y.nome == filtro))
      }
    }
    else {
      this.pessoaJogo = this.origi
    }
    if (this.filtros.genero.length != 0) {
      for (let filtro of this.filtros.genero) {
        this.pessoaJogo = this.pessoaJogo.filter(x => x.genero.find(y => y.nome == filtro))
      }
    }
    if (!this.filtros.status) {
      this.pessoaJogo = this.pessoaJogo.filter(x => x.status == this.filtros.status)
    }
    if (this.filtros.jogo) this.pessoaJogo = this.pessoaJogo.filter(x => !x.nome.toUpperCase().search(this.filtros.jogo.toUpperCase()))
  }

  selecionaJogo(jogo) {
    this.modalJogo = jogo
  }


  limpar() {
    this.sucRequi = false
    this.filtros = {
      status: 0,
      jogo: '',
      genero: [],
      plataforma: [],
    }
    this.aplicaFiltros()
  }

}
