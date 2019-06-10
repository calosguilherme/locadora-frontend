import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';




@Component({
  selector: 'gerenciarPessoas',
  templateUrl: './gerenciarPessoas.component.html',
  styleUrls: ['./gerenciarPessoas.component.css']
})
export class GerenciarPessoasComponent implements OnInit {
  pessoa: Pessoa
  displayDialog: boolean;
  selected
  newPessoa: boolean;
  pessoas: Pessoa[];
  cols: any[];
  sucRequi: boolean = false


  constructor(
    private pessoaService: PessoaService,
  ) { }

  ngOnInit() {
    this.pessoaService.getPessoas().subscribe(pessoa => {
      suc => {
        console.log(suc)
      }
      this.pessoas = pessoa
      this.sucRequi = true
    })


    this.cols = [
      { field: 'idpessoa', header: 'ID' },
      { field: 'nome', header: 'Nome' },
      { field: 'nomeusuario', header: 'User Name' },
      { field: 'cpf', header: 'CPF' },
      { field: 'pontuacao', header: '⭐Pontuação⭐' },
      { field: 'email', header: 'Email' },
      { field: 'datanascimento', header: 'Data Nascimento' },
    ];
  }

  showDialogToAdd() {
    this.newPessoa = true;
    this.pessoa = new Pessoa();
    this.displayDialog = true;
  }

  save() {
    let pessoas = [...this.pessoas];
    if (this.newPessoa)
      pessoas.push(this.pessoa);
    else {
      this.pessoaService.postPessoa(this.pessoa).subscribe(
        suc => {
        console.log(this.pessoa)
         pessoas[this.pessoas.indexOf(this.selected)] = this.pessoa;
      })
    }
    this.pessoas = pessoas;
    this.pessoa = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.pessoas.indexOf(this.selected);
    console.log(this.pessoas[index].idpessoa)
    this.pessoaService.removePessoa(this.pessoas[index].idpessoa).subscribe(
    suc => {
          this.pessoas = this.pessoas.filter((val, i) => i != index);
          this.pessoa = null;
          this.displayDialog = false;
        },)
  }

  onRowSelect(event) {
    this.newPessoa = false;
    this.pessoa = this.clonePessoa(event.data);
    this.displayDialog = true;
  }

  clonePessoa(p: Pessoa): Pessoa {
    let pessoa = { ...p };
    return pessoa;
  }
}
