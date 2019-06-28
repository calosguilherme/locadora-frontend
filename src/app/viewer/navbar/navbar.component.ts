import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthServiceLocadora } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
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
  ) {  }

  ngOnInit() {
    if (this.logado) {
      this.user = this.cookieService.getAll()
    }
  }


  sair() {
    this.authServiceLocadora.logout()
    window.location.href = "/"; 
  }

  logar() {
    console.log(this.login)
    this.authServiceLocadora.login(this.login).subscribe(
      success => {
        this.authServiceLocadora.salvacookie(success)
        this.router.navigate(['home']);
      },
      error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
  }


}
