import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Jogo } from 'src/app/model/jogo.model';
import { Genero } from 'src/app/model/genero.model';
import { GeneroService } from 'src/app/services/generoService';
import { PlataformaService } from 'src/app/services/plataformaService';
import { PessoaJogo } from 'src/app/model/pessoajogo.model';
import { CookieService } from 'ngx-cookie-service';
import { PessoaJogoService } from 'src/app/services/pessoaJogoService';
import { MessageService } from 'primeng/components/common/messageservice';


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
  public cadPessoaJogo: boolean = false
  public sucRequi: boolean = false
  public preco: number
  cookieExists: boolean = this.cookieService.check('idpessoa');
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
    private cookieService: CookieService,
    private pessoaJogoService: PessoaJogoService,
    private messageService: MessageService,
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

  criaPessoaJogo() {
    let pessoaJogo = new PessoaJogo()
    pessoaJogo.idjogo = this.modalJogo.idjogo
    pessoaJogo.idpessoa = Number(this.cookieService.get('idpessoa'))
    pessoaJogo.preco = this.preco
    pessoaJogo.status = 0
    this.pessoaJogoService.create(pessoaJogo).subscribe(
      success => {
        this.cadPessoaJogo = false;
        console.log(success)
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
      },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
  }

}
