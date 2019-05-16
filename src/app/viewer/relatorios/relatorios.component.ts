import { Component, OnInit } from '@angular/core';
import { VitrineService } from 'src/app/services/vitrineService';
import { VitrineJogo } from 'src/app/model/vitrineJogo.model';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';



@Component({
  selector: 'app-home',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  vitrineJogo: VitrineJogo[]
  pessoas: Pessoa[]

  constructor(
    private vitrineService: VitrineService,
    private pessoaService: PessoaService,
  ) {  }

  ngOnInit() {
    this.vitrineService.getJogosVitrine().subscribe(vitrineJogo => this.vitrineJogo = vitrineJogo)
    this.pessoaService.getPessoas().subscribe(pessoas => this.pessoas = pessoas)
  
  }
  
}
