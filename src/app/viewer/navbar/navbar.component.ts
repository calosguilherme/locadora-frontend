import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthServiceLocadora } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'angularx-social-login';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  login: Auth = new Auth()
  erro: boolean = false
  admin: boolean = this.cookieService.check('numeroregistro');
  logado: boolean = this.cookieService.check('idpessoa');
  user: any

  constructor(
    private authServiceLocadora: AuthServiceLocadora,
    private messageService: MessageService,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {  }

  ngOnInit() {
    if (this.logado) {
      this.user = this.cookieService.getAll()
    }
  }


  sair() {
    this.blockUI.start('Carregando');
    this.authServiceLocadora.logout()
    this.authService.signOut();
    window.location.href = "/";
    this.blockUI.stop();
  }


}
