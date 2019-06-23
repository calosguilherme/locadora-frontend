import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Genero } from 'src/app/model/genero.model';
import { JogosService } from 'src/app/services/jogosService';
import { Jogo } from 'src/app/model/jogo.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { PlataformaService } from 'src/app/services/plataformaService';
import { GeneroService } from 'src/app/services/generoService';



@Component({
  selector: 'cadastroJogo',
  templateUrl: './cadastroJogo.component.html',
  styleUrls: ['./cadastroJogo.component.css']
})
export class CadastroJogocomponent implements OnInit {
  @Input() jogo: Jogo
  plataformas: SelectItem[]
  generos: Genero[]
  @Output() retornoJogo = new EventEmitter()

  constructor(
    private plataformaService: PlataformaService,
    private generoService: GeneroService
  ) {}

  ngOnInit() {
    this.plataformaService.getComFiltros({status: 0}).subscribe(plataformas => {
      this.plataformas = this.criaSelectPlataforma(plataformas)
    });
    this.generoService.getComFiltros({ status: 0 }).subscribe(generos => this.generos = generos);

  }

  feedback() {
    console.log('feedback')
    return (this.retornoJogo.emit(this.jogo));
  }


  criaSelectPlataforma(plataformas: Plataforma[]): SelectItem[] {
    let select: SelectItem[] = []
    for (let plat of plataformas) {
      select.push({label:plat.nome, value:plat})
    }
    return select
  }

  print(a) {
    console.log(a)
  }


}
