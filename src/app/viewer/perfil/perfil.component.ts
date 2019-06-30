import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PessoaJogoService } from 'src/app/services/pessoaJogoService';
import { PessoaJogo } from 'src/app/model/pessoajogo.model';
import { CookieService } from 'ngx-cookie-service';
import { VitrineJogo } from 'src/app/model/vitrineJogo.model';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  menuSelect: string = '0'
  active: boolean = false
  pessoaJogo: VitrineJogo[]
  user: any = this.cookieService.getAll()
  sucRequi: boolean = false

  constructor(
    private route: ActivatedRoute,
    private pessoaJogoService: PessoaJogoService,
    private cookieService: CookieService,
  ) {  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.menuSelect = params['menu']
      console.log(this.menuSelect)
      this.verificaTelaIni(this.menuSelect) 
    })
  }

  verificaTelaIni(menu) {
    console.log(menu)
    switch (menu) {
      case '0': {
        break
      }
      case '1': {
        break
      }
      case '2': {
        this.loadVitrine()
        break
      }
      case '3': {
        break
      }
    }
  }

  loadVitrine() {
    this.menuSelect = '2'
    this.getPessoaJogo()
  }
  getPessoaJogo() {
    this.pessoaJogoService.getById(this.user.idpessoa).subscribe(pessoaJogo => {
      console.log(pessoaJogo)
      this.pessoaJogo = pessoaJogo
      this.sucRequi = true
    })
  }

}
