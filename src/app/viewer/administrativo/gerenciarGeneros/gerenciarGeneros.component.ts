import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Genero } from 'src/app/model/genero.model';




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
    private jogoService: JogosService,
  ) { }

  ngOnInit() {
    this.jogoService.getGeneros().subscribe(generos => {
      suc => {
        console.log(suc)
      }
      this.generos = generos
      this.sucRequi = true
    })


    this.cols = [
      { field: 'idgenero', header: 'ID' },
      { field: 'nome', header: 'Nome' },
    ];
  }

  showDialogToAdd() {
    this.newGenero = true;
    this.genero = new Genero();
    this.displayDialog = true;
  }

  save() {
    let generos = [...this.generos];
    if (this.newGenero) {
      this.jogoService.postGenero(this.genero).subscribe(
        suc => {
          console.log(this.genero)
          generos.push(this.genero);
        })
    }

    else {
      this.jogoService.postGenero(this.genero).subscribe(
        suc => {
        console.log(this.genero)
         generos[this.generos.indexOf(this.selected)] = this.genero;
      })
    }
    this.generos = generos;
    this.genero = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.generos.indexOf(this.selected);
    console.log(this.generos[index].idgenero)
    this.jogoService.removeGenero(this.generos[index].idgenero).subscribe(
    suc => {
          this.generos = this.generos.filter((val, i) => i != index);
          this.genero = null;
          this.displayDialog = false;
        },)
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
