import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthServiceLocadora } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { Cep } from 'src/app/model/cep.model';
import { CookieService } from 'ngx-cookie-service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  login: Auth = new Auth()
  erro: boolean = false
  user: any

  constructor(
    private authServiceLocadora: AuthServiceLocadora,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private pessoaService: PessoaService,
  ) {  }

  ngOnInit() {
    console.log(JSON.stringify({}))
  }

  logar() {
    this.blockUI.start('Carregando');
    this.authServiceLocadora.login(this.login).subscribe(
      success => {
        this.authServiceLocadora.salvacookie(success)
        window.location.href = "/home";
        this.blockUI.stop();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
        this.blockUI.stop();
      })
  }

  signInWithFB(): void {
    this.blockUI.start('Carregando');
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).finally(() => {
      this.authService.authState.subscribe((user) => {
        this.user = user
      })
    }).then(() => {
      setTimeout(() => {    //<<<---    using ()=> syntax
        this.verificaEmailBack(this.user)
      }, 3000);
      });
  }



  verificaEmailBack(user) {
    console.log('verifica')
    this.authServiceLocadora.checaEmail(user.email).subscribe(
      success => {
        this.authServiceLocadora.salvacookie(success)
        this.cookieService.set('urlimagem', user['photoUrl'])
        window.location.href = "/home";
        this.blockUI.stop();
      },
      error => {
        let cepi: Cep = new Cep()
        let novaContaLocadora = new Pessoa()
        let data = new Date(22071995)
        novaContaLocadora.urlimagem = user.email
        novaContaLocadora.cpf = user.id.slice(0, user.id.slice.length - 6)
        novaContaLocadora.urlimagem = user.photoUrl
        novaContaLocadora.status = 0
        novaContaLocadora.sexo = 0
        novaContaLocadora.senha = user.id
        novaContaLocadora.nomeusuario = user.name
        novaContaLocadora.nome = user.name
        novaContaLocadora.email = user.email
        novaContaLocadora.datanascimento = data
        cepi.numero = 29185000
        cepi.bairro.nome = "Major Bley"
        cepi.bairro.municipio.nome = "Fundão"
        cepi.bairro.municipio.estado.nome = "ES"
        novaContaLocadora.cep = cepi
        this.pessoaService.create(novaContaLocadora).subscribe(
          success => {
            this.login.cpf = Number(novaContaLocadora.cpf)
            this.login.senha = Number(novaContaLocadora.senha)
            this.logar()
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
            this.blockUI.stop();
          })
      })
  }

}
