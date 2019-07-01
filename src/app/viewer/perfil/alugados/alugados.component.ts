import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PessoaJogoService } from 'src/app/services/pessoaJogoService';
import { PessoaJogo } from 'src/app/model/pessoajogo.model';
import { CookieService } from 'ngx-cookie-service';
import { VitrineJogo } from 'src/app/model/vitrineJogo.model';
import { GeneroService } from 'src/app/services/generoService';
import { PlataformaService } from 'src/app/services/plataformaService';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Genero } from 'src/app/model/genero.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { LocacaoService } from 'src/app/services/locacaoService';


@Component({
  selector: 'alugados',
  templateUrl: './alugados.component.html',
  styleUrls: ['./alugados.component.css'],
})
export class AlugadosComponent implements OnInit {
  menuSelect: string = '0'
  active: boolean = false
  pessoaJogo: any[]
  user: any = this.cookieService.getAll()
  sucRequi: boolean = false
  plataformas: Plataforma[]
  generos: Genero[]
  infoPessoaJogo: boolean = false
  origi: any[]
  modalJogo: any
  preco: number
  public filtros = {
    vitrine: true,
    jogo: '',
    genero: [],
    plataforma: [],
  }

  constructor(
    private pessoaJogoService: PessoaJogoService,
    private cookieService: CookieService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
    private messageService: MessageService,
    private locacaoService: LocacaoService,
  ) {  }

  ngOnInit() {
    this.getPessoaJogo()
    this.plataformaService.getComFiltros({ status: 0 }).subscribe(plataformas => this.plataformas = plataformas)
    this.generoService.getComFiltros({ status: 0 }).subscribe(generos => this.generos = generos)
  }

  getPessoaJogo() {
    this.locacaoService.loadByID(this.user.idpessoa).subscribe(pessoaJogo => {
      console.log(pessoaJogo)
      this.pessoaJogo = pessoaJogo
      this.origi = pessoaJogo
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
        this.jogosOrdemPreco()
        break;
      }
      case '3': {
        this.jogosOrdemDevo()
        break;
      }
    }
  }

  jogosOrdemAlfabetica() {
    this.pessoaJogo = this.pessoaJogo.sort(function (a, b) {
      if (a.pessoajogo.jogo.nome > b.pessoajogo.jogo.nome) {
        return 1;
      }
      if (a.pessoajogo.jogo.nome < b.pessoajogo.jogo.nome) {
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

  jogosOrdemDevo() {
    this.pessoaJogo = this.pessoaJogo.sort(function (a, b) {
      if (a.datadevolucao > b.datadevolucao) {
        return 1;
      }
      if (a.datadevolucao < b.datadevolucao) {
        return -1;
      }
      return 0;
    });
  }

  jogosOrdemPreco() {
    this.pessoaJogo = this.pessoaJogo.sort(function (a, b) {
      if (a.preco < b.preco) {
        return 1;
      }
      if (a.preco > b.preco) {
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

  getAlugado() {
    this.filtros.vitrine = !this.filtros.vitrine
    this.aplicaFiltros()
  }

  aplicaFiltros() {
    if (this.filtros.plataforma.length != 0) {
      console.log(this.pessoaJogo)
      for (let filtro of this.filtros.plataforma) {
        this.pessoaJogo = this.origi.filter(x => x.pessoajogo.jogo.plataforma.find(y => y.nome == filtro))
      }
    }
    else {
      this.pessoaJogo = this.origi
    }
    if (this.filtros.genero.length != 0) {
      for (let filtro of this.filtros.genero) {
        this.pessoaJogo = this.pessoaJogo.filter(x => x.pessoajogo.jogo.genero.find(y => y.nome == filtro))
      }
    }
    if (!this.filtros.vitrine) {
      this.pessoaJogo = this.pessoaJogo.filter(x => x.vitrine == this.filtros.vitrine)
    }
    if (this.filtros.jogo) this.pessoaJogo = this.pessoaJogo.filter(x => !x.pessoajogo.jogo.nome.toUpperCase().search(this.filtros.jogo.toUpperCase()))
  }

  selecionaJogo(jogo) {
    this.modalJogo = jogo
    this.preco = this.modalJogo.preco
  }

  atualizaPreco(){
    let pessoaJogo = new PessoaJogo()
    pessoaJogo.idjogo = this.modalJogo.idjogo
    pessoaJogo.idpessoa = Number(this.cookieService.get('idpessoa'))
    pessoaJogo.preco = this.preco
    pessoaJogo.status = 0
    this.pessoaJogoService.update(pessoaJogo).subscribe(
      success => {
        this.infoPessoaJogo = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
        this.getPessoaJogo()
        this.aplicaFiltros()
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
  }

  limpar() {
    this.filtros = {
      vitrine: true,
      jogo: '',
      genero: [],
      plataforma: [],
    }
    this.aplicaFiltros()
  }

  entregue(dataDevo) {
    let data = new Date()
    if (dataDevo < data.getDate()) return ("Entregue")
    else {
      return("Não Entregue")
    }
  }

}
