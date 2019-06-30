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
    })
  }

}
