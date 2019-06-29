import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  menuSelect: string = '0'
  active: boolean = false

  constructor(
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.menuSelect = params['menu']
    })
  }


}
