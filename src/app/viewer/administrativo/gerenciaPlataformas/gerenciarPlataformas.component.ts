import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Plataforma } from 'src/app/model/plataforma.model';




@Component({
  selector: 'gerenciarPlataformas',
  templateUrl: './gerenciarPlataformas.component.html',
  styleUrls: ['./gerenciarPlataformas.component.css']
})
export class GerenciarPlataformas implements OnInit {
  plataforma: Plataforma
  displayDialog: boolean;
  selected
  newPlataforma: boolean;
  plataformas: Plataforma[];
  cols: any[];
  sucRequi: boolean = false


  constructor(
    private jogoService: JogosService,
  ) { }

  ngOnInit() {
    this.jogoService.getPlataformas().subscribe(plataformas => {
      suc => {
        console.log(suc)
      }
      this.plataformas = plataformas
      this.sucRequi = true
    })


    this.cols = [
      { field: 'idplataforma', header: 'ID' },
      { field: 'nome', header: 'Nome' },
      { field: 'urlimagem', header: 'URL Imagem' },
    ];
  }

  showDialogToAdd() {
    this.newPlataforma = true;
    this.plataforma = new Plataforma();
    this.displayDialog = true;
  }

  save() {
    let plataformas = [...this.plataformas];
    if (this.newPlataforma) {
      this.jogoService.postPlataforma(this.plataforma).subscribe(
        suc => {
          console.log(this.plataforma)
          plataformas.push(this.plataforma);
        })
    }

    else {
      this.jogoService.postPlataforma(this.plataforma).subscribe(
        suc => {
        console.log(this.plataforma)
         plataformas[this.plataformas.indexOf(this.selected)] = this.plataforma;
      })
    }
    this.plataformas = plataformas;
    this.plataforma = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.plataformas.indexOf(this.selected);
    console.log(this.plataformas[index].idplataforma)
    this.jogoService.removePlataforma(this.plataformas[index].idplataforma).subscribe(
    suc => {
          this.plataformas = this.plataformas.filter((val, i) => i != index);
          this.plataforma = null;
          this.displayDialog = false;
        },)
  }

  onRowSelect(event) {
    this.newPlataforma = false;
    this.plataforma = this.clonePlataforma(event.data);
    this.displayDialog = true;
  }

  clonePlataforma(p: Plataforma): Plataforma {
    let plataforma = { ...p };
    return plataforma;
  }
}
