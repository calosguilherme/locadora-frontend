import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  menuSelect: number = 0
  active: boolean = false

  constructor(
  ) {  }

  ngOnInit() {
  }


}
