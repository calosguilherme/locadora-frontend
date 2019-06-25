import { Component, OnInit } from '@angular/core';
import { JogosService } from 'src/app/services/jogosService';
import { Plataforma } from 'src/app/model/plataforma.model';
import { PlataformaService } from 'src/app/services/plataformaService';
import { MessageService } from 'primeng/components/common/messageservice';




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
    private messageService: MessageService,
    private plataformaService: PlataformaService,
  ) { }

  ngOnInit() {
    this.plataformaService.getComFiltros({status: 0}).subscribe(plataformas => {
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
      this.plataformaService.create(this.plataforma).subscribe(
        success => {
          plataformas.push(this.plataforma);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
        }
      )
    }

    else {
      this.plataformaService.update(this.plataforma).subscribe(
        success => {
          plataformas[this.plataformas.indexOf(this.selected)] = this.plataforma;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
        })
    }
    this.plataformas = plataformas;
    this.plataforma = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.plataformas.indexOf(this.selected);
    this.plataformaService.remove(this.plataformas[index].idplataforma).subscribe(
    success => {
          this.plataformas = this.plataformas.filter((val, i) => i != index);
          this.plataforma = null;
          this.displayDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: success.message });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
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
