import { Component, OnInit } from '@angular/core';
import { VitrineService } from 'src/app/services/vitrineService';
import { VitrineJogo } from 'src/app/model/vitrineJogo.model';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { JogosService } from 'src/app/services/jogosService';
import { Genero } from 'src/app/model/genero.model';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Jogo } from 'src/app/model/jogo.model';



@Component({
  selector: 'gerenciarJogos',
  templateUrl: './gerenciarJogos.component.html',
  styleUrls: ['./gerenciarJogos.component.css']
})
export class GerenciarJogosComponent implements OnInit {
  jogo: Jogo
  displayDialog: boolean;
  selected
  newJogo: boolean;
  jogos: Jogo[];
  cols: any[];
  sucRequi: boolean = false


  constructor(
    private jogosService: JogosService,
  ) { }

  ngOnInit() {
    this.jogosService.getJogos().subscribe(jogos => {
      suc => {
        console.log(suc)
      }
      console.log(jogos)
      this.jogos = jogos
      this.sucRequi = true
    })


    this.cols = [
      { field: 'idjogo', header: 'ID' },
      { field: 'nome', header: 'Nome' },
      { field: 'classificacao', header: 'Classificação' },
      { field: 'anolancamento', header: 'Ano Lançamento' },
      { field: 'produtora', header: 'Produtor' },
    ];
  }

  showDialogToAdd() {
    this.newJogo = true;
    this.jogo = new Jogo();
    this.displayDialog = true;
  }

  save() {
    let jogos = [...this.jogos];
    if (this.newJogo)
      jogos.push(this.jogo);
    else {
      //this.jogosService.(this.jogo).subscribe(
      //  suc => {
      //    console.log(this.jogo)
      //    jogos[this.jogos.indexOf(this.selected)] = this.jogo;
      //  })
    }
    this.jogos = jogos;
    this.jogo = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.jogos.indexOf(this.selected);
    //this.jogosService.(this.jogos[index].idjogo).subscribe(
    //  suc => {
    //    this.jogos = this.jogos.filter((val, i) => i != index);
    //    this.jogo = null;
    //    this.displayDialog = false;
    //  })
  }

  onRowSelect(event) {
    this.jogo = this.clonePessoa(event.data);
    this.displayDialog = true;
  }

  clonePessoa(j: Jogo): Jogo {
    let jogo = { ...j };
    return jogo;
  }
}
