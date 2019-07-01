import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Municipio } from 'src/app/model/municipio.model';
import { Estado } from 'src/app/model/estado.model';
import { Bairro } from 'src/app/model/bairro.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { EnderecoService } from 'src/app/services/enderecoService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { Cep } from 'src/app/model/cep.model';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  pessoa: Pessoa = new Pessoa()
  pessoaOri: Pessoa = new Pessoa()
  pessoaForm: FormGroup
  endereco: any
  municipios: Municipio[]
  estados: Estado[]
  bairros: Bairro[]
  listmunicipio: string[] = []
  listbairro: string[] = []
  listestado: string[] = []
  suc = false
  edit = false

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private enderecoService: EnderecoService,
    private messageService: MessageService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.pessoaService.loadByID(this.cookieService.get('idpessoa')).subscribe(pessoa => {
      this.pessoa = pessoa
      this.pessoaOri = pessoa
      this.pessoa.datanascimento = new Date(pessoa.datanascimento);
      console.log(pessoa)
      this.suc= true
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      }
    )


  }

  searchMuni(event) {
    let query = event.query;
    this.enderecoService.getAllMunicipio().subscribe(municipios => {
      this.listmunicipio = []
      for (let muni of municipios) {
        this.listmunicipio.push(muni.nome)
      }
      this.listmunicipio = this.filterAutocomplete(query, this.listmunicipio)
    })
  }

  searchBairro(event) {
    let query = event.query;
    this.enderecoService.getAllBairro().subscribe(bairros => {
      this.listbairro = []
      for (let bairro of bairros) {
        this.listbairro.push(bairro.nome)
      }
      this.listbairro = this.filterAutocomplete(query, this.listbairro)
    })
  }

  searchEstado(event) {
    let query = event.query;
    this.enderecoService.getAllEstado().subscribe(estados => {
      this.listestado = []
      for (let estado of estados) {
        this.listestado.push(estado.nome)
      }
      this.listestado = this.filterAutocomplete(query, this.listestado)
    })
  }



  filterAutocomplete(query, itens: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < itens.length; i++) {
      let item = itens[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    return filtered;
  }

  pegaCep() {
    let cep = this.pessoa.cep.numero
    if (cep.toString().length >= 8) {
      this.enderecoService.getCep(cep).subscribe(endereco => {
        this.preencheEndereco(endereco)
      })
    }
  }



  preencheEndereco(endereco) {
    this.pessoa.cep.bairro.municipio.estado.nome = endereco.uf
    this.pessoa.cep.bairro.nome = endereco.bairro
    this.pessoa.cep.bairro.municipio.nome = endereco.localidade
    this.pessoa.cep.numero = this.enderecoService.apenasNumeros(endereco.cep)
  }


  envia() {
    this.pessoaService.update(this.pessoa).subscribe(
      success => {
        this.router.navigate(['perfil/0']);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
        this.edit = false
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      }
    )
  }
}
