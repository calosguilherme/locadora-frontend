import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa.model';



@Component({
  selector: 'app-home',
  templateUrl: './cadastroPessoa.component.html',
  styleUrls: ['./cadastroPessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  variavel = " OI MUNDO"
  pessoa: Pessoa = new Pessoa()
  constructor(
  ) {  }

  ngOnInit() {
  }

  search(event) {
    this.mylookupservice.getResults(event.query).then(data => {
      this.results = data;
    });
  }


}
