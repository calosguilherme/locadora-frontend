import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnderecoService } from 'src/app/services/enderecoService';
import { Municipio } from 'src/app/model/municipio.model';
import { Estado } from 'src/app/model/estado.model';
import { Bairro } from 'src/app/model/bairro.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { Cep } from 'src/app/model/cep.model';



@Component({
  selector: 'app-home',
  templateUrl: './cadastroPessoa.component.html',
  styleUrls: ['./cadastroPessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  pessoa: Pessoa = new Pessoa()
  pessoaForm: FormGroup
  endereco: any
  municipios: Municipio[]
  estados: Estado[]
  bairros: Bairro[]
  listmunicipio: string[] = []
  listbairro: string[] = []
  listestado: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private enderecoService: EnderecoService,
    private messageService: MessageService,
  ) {  }

  ngOnInit() {
    this.pessoaForm = this.formBuilder.group({
      'cep': ['', Validators.required],
      'nome': ['', [Validators.required, Validators.minLength(2)]],
      'nomeusuario': ['', [Validators.required, Validators.minLength(4)]],
      'datanascimento': ['', Validators.required],
      'estado': [null, Validators.required],
      'municipio': [null, Validators.required],
      'bairro': [null, Validators.required],
      'sexo': [null, Validators.required],
      'cpf': [null, [Validators.required, Validators.maxLength(12), Validators.minLength(12)]],
      'email': [null, [Validators.required, Validators.email]],
      'senha': [null, [Validators.required, Validators.minLength(6)]],
    });



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
    let cep = this.pessoaForm.value.cep
    if (cep.length >= 8) {
      this.enderecoService.getCep(cep).subscribe(endereco => {
        this.preencheEndereco(endereco)
      })
    }
  }



  preencheEndereco(endereco) {
    this.pessoaForm.get('estado').setValue(endereco.uf)
    this.pessoaForm.get('bairro').setValue(endereco.bairro)
    this.pessoaForm.get('municipio').setValue(endereco.localidade)
    this.pessoaForm.get('cep').setValue(this.enderecoService.apenasNumeros(endereco.cep))
  }

  montaObjetoPessoa(): Pessoa {
    let cep: Cep = new Cep()
    let pessoa: Pessoa = new Pessoa()
    cep.bairro.municipio.estado.nome = this.pessoaForm.value.estado
    cep.bairro.municipio.nome = this.pessoaForm.value.municipio
    cep.bairro.nome = this.pessoaForm.value.bairro
    cep.numero = this.pessoaForm.value.cep
    pessoa.cpf = this.pessoaForm.value.cpf
    pessoa.senha = this.pessoaForm.value.senha
    pessoa.email = this.pessoaForm.value.email
    pessoa.nomeusuario = this.pessoaForm.value.nomeusuario
    pessoa.datanascimento = this.pessoaForm.value.datanascimento
    pessoa.sexo = this.pessoaForm.value.sexo.value
    pessoa.nome = this.pessoaForm.value.nometa
    if (pessoa.sexo == 0) pessoa.urlimagem = 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/123155116/original/ada692539ed9ea12a2d20bf054ab5316d211254b/create-illustrative-instagram-twitch-and-youtube-profile-pictures.jpg'
    else pessoa.urlimagem = "https://d12swbtw719y4s.cloudfront.net/images/jjeUS6nn/2I5SMJe9DNNUHdqLO0Xk/FaceQ1468032328760.jpeg?w=463"
    pessoa.cep = cep
    pessoa.status = 0
    return(pessoa)
  }

  envia() {
    this.pessoaService.create(this.montaObjetoPessoa()).subscribe(
      success => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message() });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      }
    )
  }
}
