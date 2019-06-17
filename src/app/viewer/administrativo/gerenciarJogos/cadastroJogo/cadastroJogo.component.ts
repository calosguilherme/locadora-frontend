import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnderecoService } from 'src/app/services/enderecoService';
import { Municipio } from 'src/app/model/municipio.model';
import { Estado } from 'src/app/model/estado.model';
import { Bairro } from 'src/app/model/bairro.model';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Genero } from 'src/app/model/genero.model';
import { JogosService } from 'src/app/services/jogosService';
import { Jogo } from 'src/app/model/jogo.model';
import { SelectItem } from 'primeng/components/common/selectitem';



@Component({
  selector: 'cadastroJogo',
  templateUrl: './cadastroJogo.component.html',
  styleUrls: ['./cadastroJogo.component.css']
})
export class CadastroJogocomponent implements OnInit {
  @Input() jogo: Jogo
  pessoaForm: FormGroup
  endereco: any
  municipios: Municipio[]
  plataformas: SelectItem[]
  generos: Genero[]
  cars: SelectItem[];

  selectedCars1: string[] = [];

  selectedCars2: string[] = [];

  items: SelectItem[];

  item: string;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private jogosService: JogosService
  ) {
  }

  ngOnInit() {
    this.jogosService.getPlataformas().subscribe(plataformas => {
      this.plataformas = this.criaSelectPlataforma(plataformas)
    });
    this.jogosService.getGeneros().subscribe(generos => this.generos = generos);


  }


  search(event) {
    //this.mylookupservice.getResults(event.query).then(data => {
    //  this.results = data;
    //});
    return
  }


  criaSelectPlataforma(plataformas: Plataforma[]): SelectItem[] {
    let select: SelectItem[] = []
    for (let plat of plataformas) {
      select.push({label:plat.nome, value:plat})
    }
    console.log(select)
    return select
  }

  print(a) {
    console.log(a)
  }

  preencheEndereco(endereco) {
    this.pessoaForm.get('estado').setValue(endereco.uf)
    this.pessoaForm.get('bairro').setValue(endereco.bairro)
    this.pessoaForm.get('municipio').setValue(endereco.localidade)
    this.pessoaForm.get('cep').setValue('10')
  }

  envia() {
    this.pessoaForm.get('sexo').setValue(this.pessoaForm.value.sexo.value)
    this.pessoaService.postPessoa(this.pessoaForm.value).subscribe(suc => {
      console.log(suc);
    },
      err => {
        console.log(err);
      }
    )
  }
}
