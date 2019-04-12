import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnderecoService } from 'src/app/services/enderecoService';



@Component({
  selector: 'app-home',
  templateUrl: './cadastroPessoa.component.html',
  styleUrls: ['./cadastroPessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  variavel = " OI MUNDO"
  pessoa: Pessoa = new Pessoa()
  pessoaForm: FormGroup
  endereco: any


  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private enderecoService: EnderecoService
  ) {  }

  ngOnInit() {
    this.pessoaForm = this.formBuilder.group({
      'cep': ['', Validators.required],
      'nome': ['', [Validators.required, Validators.minLength(2)]],
      'nomeusuario': ['', [Validators.required, Validators.minLength(4)]],
      'datanascimento': [''],
      'estado': [null, Validators.required],
      'municipio': [null, Validators.required],
      'bairro': [null, Validators.required],
      'sexo': null,
      'cpf': [null, Validators.required],
      'senha': [null, [Validators.required, Validators.minLength(6)]],

    });

  }

  search(event) {
    //this.mylookupservice.getResults(event.query).then(data => {
    //  this.results = data;
    //});
    return
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
    this.pessoaForm.get('cep').setValue(endereco.cep)
  }

  envia() {
    this.pessoaForm.get('sexo').setValue(this.pessoaForm.value.sexo.value)
    console.log(this.pessoaForm.value)
    this.pessoaService.postPessoa(this.pessoaForm.value).subscribe(suc => {
      console.log(suc);
    },
      err => {
        console.log(err);
      }
    )
  }
}
