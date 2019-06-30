import { Component, OnInit } from "@angular/core";
import { JogosService } from "src/app/services/jogosService";
import { Plataforma } from "src/app/model/plataforma.model";
import { Jogo } from "src/app/model/jogo.model";
import { Genero } from "src/app/model/genero.model";
import { GeneroService } from "src/app/services/generoService";
import { PlataformaService } from "src/app/services/plataformaService";
import { PessoaJogo } from "src/app/model/pessoajogo.model";
import { CookieService } from "ngx-cookie-service";
import { PessoaJogoService } from "src/app/services/pessoaJogoService";
import { MessageService } from "primeng/components/common/messageservice";
import { Estado } from "src/app/model/estado.model";
import { Municipio } from "src/app/model/municipio.model";
import { Bairro } from "src/app/model/bairro.model";
import { EnderecoService } from "src/app/services/enderecoService";
import { logging } from 'protractor';
import { LocacaoService } from "src/app/services/locacaoService";
import { Router } from '@angular/router';

@Component({
  selector: "alugar",
  templateUrl: "./alugar.component.html",
  styleUrls: ["./alugar.component.css"]
})
export class AlugarComponent implements OnInit {
  public plataformas: Plataforma[];
  public estados: Estado[];
  public municipios: Municipio[];
  public bairros: Bairro[];
  public jogos: Jogo[];
  public generos: Genero[];
  public pesquisarNome: string;
  public modalJogo: Jogo;
  public cadPessoaJogo: boolean = false;
  public alugarJogo: boolean = false;
  public pessoaJogos: PessoaJogo[];
  public confirmarAluguel: boolean;
  public metodopagamento: number
  public sucRequi: boolean = false;
  public preco: number;
  public avaliacao: number[]
  public pessoaJogo: PessoaJogo
  public dataLocacao: Date
  public dataDevolucao: Date
  private router: Router
  cookieExists: boolean = this.cookieService.check("idpessoa");
  public filtros = {
    jogo: "",
    genero: [],
    plataforma: [],
    bairro: [],
    municipio: [],
    estado: []
  };
  public camposPlata = [];
  public camposEst = [];
  public camposMun = [];
  public camposBai = [];
  public camposGen = [];

  constructor(
    private locacaoService: LocacaoService,
    private jogosService: PessoaJogoService,
    public enderecoService: EnderecoService,
    private generoService: GeneroService,
    private plataformaService: PlataformaService,
    private cookieService: CookieService,
    private pessoaJogoService: PessoaJogoService,
    private messageService: MessageService

  ) {}

  ngOnInit() {
    this.plataformaService
      .getComFiltros({ status: 0 })
      .subscribe(plataformas => (this.plataformas = plataformas));
    this.pegaJogos();
    this.generoService
      .getComFiltros({ status: 0 })
      .subscribe(generos => (this.generos = generos));
    this.pegaEndereco();
    this.preco = 0
  }
  pegaJogos(filtro?) {
    this.jogosService.getComFiltros(filtro).subscribe(jogos => {
      this.jogos = jogos;
      this.sucRequi = true;
    });
  }

  calcularPreco() {
    if (this.dataLocacao && this.dataDevolucao && (this.dataLocacao< this.dataDevolucao )) {
      var timeDiff = Math.abs(this.dataDevolucao.getTime() - this.dataLocacao.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.preco = (this.pessoaJogo.preco * diffDays)
    } else {
      this.preco = 0
    }
  }

  alugar(pessoajogo) {
    this.pessoaJogo = pessoajogo  
    this.alugarJogo  = true
  }

  confirmarLocacao() {
    const { idpessoa, idjogo } = this.pessoaJogo;

    const body = {
      idcartao: 1,
      metodopagamento: this.metodopagamento,
      datadevolucao: this.dataDevolucao.toString(),
      datalocacao: this.dataLocacao.toString(),
      tipopagamento:1,
      pessoa: 4,
      idpessoa,
      idjogo
    }
    
    this.locacaoService.create(body).subscribe(
      success => {
        this.router.navigate(['home']);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      }
    )
  }
  

  listarPessoaJogo(jogo) {
    this.modalJogo = jogo
    
    this.pessoaJogos = jogo.pessoajogo    
  }
  pegaEndereco() {
    this.enderecoService.getAllBairro().subscribe(bairro => {
      this.bairros = bairro;
      console.log(bairro);
    });
    this.enderecoService
      .getAllMunicipio()
      .subscribe(municipio => (this.municipios = municipio));
    this.enderecoService
      .getAllEstado()
      .subscribe(estado => (this.estados = estado));
  }

  ordenaJogos(i) {
    switch (i) {
      case "0": {
        this.jogosOrdemId();
        break;
      }
      case "1": {
        this.jogosOrdemAlfabetica();
        break;
      }
      case "2": {
        this.jogosOrdemMaisRecente();
        break;
      }
    }
  }

  jogosOrdemAlfabetica() {
    this.jogos = this.jogos.sort(function(a, b) {
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
    this.jogos = this.jogos.sort(function(a, b) {
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
    this.jogos = this.jogos.sort(function(a, b) {
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
    this.sucRequi = false;
    if (this.filtros.plataforma.find(x => x == nome)) {
      this.filtros.plataforma = this.filtros.plataforma.filter(x => x != nome);
    } else {
      this.filtros.plataforma.push(nome);
    }
    this.pegaJogos(this.filtros);
  }
  getGenero(nome) {
    this.sucRequi = false;
    if (this.filtros.genero.find(x => x == nome)) {
      this.filtros.genero = this.filtros.genero.filter(x => x != nome);
    } else {
      this.filtros.genero.push(nome);
    }
    this.pegaJogos(this.filtros);
  }

  getMunicipio(nome) {
    this.sucRequi = false;
    if (this.filtros.municipio.find(x => x == nome)) {
      this.filtros.municipio = this.filtros.municipio.filter(x => x != nome);
    } else {
      this.filtros.municipio.push(nome);
    }
    this.pegaJogos(this.filtros);
  }

  getBairro(nome) {
    this.sucRequi = false;
    if (this.filtros.bairro.find(x => x == nome)) {
      this.filtros.bairro = this.filtros.bairro.filter(x => x != nome);
    } else {
      this.filtros.bairro.push(nome);
    }
    this.pegaJogos(this.filtros);
  }

  getEstado(nome) {
    this.sucRequi = false;
    if (this.filtros.estado.find(x => x == nome)) {
      this.filtros.estado = this.filtros.estado.filter(x => x != nome);
    } else {
      this.filtros.estado.push(nome);
    }
    this.pegaJogos(this.filtros);
  }

  selecionaJogo(jogo) {
    this.modalJogo = jogo;
  }
  

  limpar() {
    this.sucRequi = false;
    this.camposPlata = [];
    this.camposEst = [];
    this.camposMun = [];
    this.camposBai = [];
    this.camposGen = [];
    this.filtros = {
      jogo: "",
      genero: [],
      plataforma: [],
      bairro: [],
      municipio: [],
      estado: []
    };
    this.pegaJogos();
  }

  criaPessoaJogo() {
    let pessoaJogo = new PessoaJogo();
    pessoaJogo.idjogo = this.modalJogo.idjogo;
    pessoaJogo.idpessoa = Number(this.cookieService.get("idpessoa"));
    pessoaJogo.preco = this.preco;
    this.pessoaJogoService.create(pessoaJogo).subscribe(
      success => {
        this.cadPessoaJogo = false;
        console.log(success);
        this.messageService.add({
          severity: "success",
          summary: "Sucesso",
          detail: success.message
        });
      },
      error => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: error.error.text
        });
      }
    );
  }
}
