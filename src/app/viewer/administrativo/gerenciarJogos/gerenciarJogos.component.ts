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
    this.jogosService.getComFiltros({status: 0}).subscribe(jogos => {
      suc => {
      }
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
    if (this.newJogo) {
      this.jogosService.create(this.jogo).subscribe(
        suc => {
          jogos.push(this.jogo);
        })
    }
    else {
      this.jogosService.update(this.jogo).subscribe(
        suc => {
          jogos[this.jogos.indexOf(this.selected)] = this.jogo;
        })
    }
    this.jogos = jogos;
    this.jogo = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.jogos.indexOf(this.selected);
    this.jogosService.remove(this.jogos[index].idjogo).subscribe(
      suc => {
        this.jogos = this.jogos.filter((val, i) => i != index);
        this.jogo = null;
        this.displayDialog = false;
      })
  }

  onRowSelect(event) {
    this.newJogo = false
    this.jogo = this.cloneJogo(event.data);
    this.jogo.anolancamento = new Date(this.jogo.anolancamento)
    this.displayDialog = true;
  }

  cloneJogo(j: Jogo): Jogo {
    let jogo = { ...j };
    return jogo;
  }

  reciverFeedback(respostaFilho) {
    this.jogo = respostaFilho;
  }
}
