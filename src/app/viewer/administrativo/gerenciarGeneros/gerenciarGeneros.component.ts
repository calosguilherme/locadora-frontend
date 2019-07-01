import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Genero } from 'src/app/model/genero.model';
import { GeneroService } from 'src/app/services/generoService';
import { MessageService } from 'primeng/components/common/messageservice';




@Component({
  selector: 'gerenciarGeneros',
  templateUrl: './gerenciarGeneros.component.html',
  styleUrls: ['./gerenciarGeneros.component.css']
})
export class GerenciarGeneros implements OnInit {
  genero: Genero
  displayDialog: boolean;
  selected
  newGenero: boolean;
  generos: Genero[];
  cols: any[];
  sucRequi: boolean = false


  constructor(
    private messageService: MessageService,
    private generoService: GeneroService,
  ) { }

  ngOnInit() {
    this.getDados()


    this.cols = [
      { field: 'idgenero', header: 'ID' },
      { field: 'nome', header: 'Nome' },
    ];
  }

  getDados() {
    return (this.generoService.getComFiltros({status: 0}).subscribe(generos => {
      success => {}
      this.generos = generos
      this.sucRequi = true
    }))
  }

  showDialogToAdd() {
    this.newGenero = true;
    this.genero = new Genero();
    this.displayDialog = true;
  }

  save() {
    let generos = [...this.generos];
    if (this.newGenero) {
      this.generoService.create(this.genero).subscribe(
        success => {
          generos.push(this.genero);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
        }
      )
    }

    else {
      this.generoService.update(this.genero).subscribe(
        success => {
          generos[this.generos.indexOf(this.selected)] = this.genero;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
        }
      )
    }
    this.generos = generos;
    this.displayDialog = false;
  }

  delete() {
    let index = this.generos.indexOf(this.selected);
    this.generoService.remove(this.generos[index].idgenero).subscribe(
      success => {
          this.generos = this.generos.filter((val, i) => i != index);
          this.genero = null;
          this.displayDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      }

    )
  }

  onRowSelect(event) {
    this.newGenero = false;
    this.genero = this.cloneGenero(event.data);
    this.displayDialog = true;
  }

  cloneGenero(p: Genero): Genero {
    let genero = { ...p };
    return genero;
  }
}
