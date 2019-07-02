import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.menuSelect = params['menu']
    })
  }

  pegaTitulo(menu: string) {
    switch (menu) {
      case '0': {
        return ('Configurações')
      }
      case '1': {
        return ('Jogos Alugados')
      }
      case '2': {
        return ('Sua Vitrine')
      }
      case '3': {
        return ('Jogos Recomendados')
      }
    }
  }

}
