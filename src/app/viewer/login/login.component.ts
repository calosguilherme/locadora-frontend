import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthServiceLocadora } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  login: Auth = new Auth()
  erro: boolean = false
  test
  constructor(
    private authServiceLocadora: AuthServiceLocadora,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private pessoaService: PessoaService,
  ) {  }

  ngOnInit() {
  }

  logar() {
    console.log(this.login)
    this.authServiceLocadora.login(this.login).subscribe(
      success => {
        console.log(success)
        this.authServiceLocadora.salvacookie(success)
        window.location.href = "/home"; 
      },
      error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.authServiceLocadora.checaEmail(user.email).subscribe(
        success => {
          console.log(success)
          let contaLocadoraPessoal = new Auth()
          //contaLocadoraPessoal.cpf = success.cpf
          //contaLocadoraPessoal.senha = success.senha
          //this.authServiceLocadora.salvacookie(success)
          //window.location.href = "/home";
        },
        error => {
          let novaContaLocadora = new Pessoa()
          let data = new Date('22/07/1995')
          novaContaLocadora.urlimagem = user.email
          novaContaLocadora.cpf = user.id.slice(0, user.id.slice.length - 5)
          novaContaLocadora.urlimagem = user.photoUrl
          novaContaLocadora.status = 0
          novaContaLocadora.sexo = 0
          novaContaLocadora.senha = user.id
          novaContaLocadora.nomeusuario = user.name
          novaContaLocadora.nome = user.name
          novaContaLocadora.email = user.email
          novaContaLocadora.datanascimento = data
          novaContaLocadora.cep.numero = 29185000
          novaContaLocadora.cep.bairro.nome = "Major Bley"
          novaContaLocadora.cep.bairro.municipio.nome = "Fundão"
          novaContaLocadora.cep.bairro.municipio.estado.nome = "ES"
          this.pessoaService.create(novaContaLocadora).subscribe(success => {
            this.login.cpf = Number (novaContaLocadora.cpf)
            this.login.senha = Number (novaContaLocadora.senha)
            this.logar()
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
            })
          console.log(error)
          //Cadastrar conta
        })
      console.log(user.email)
    });
  }

  signOut(): void {
    this.authService.signOut();
  }



    //FB.login(permissao).subscribe((response) => {
    //  console.log('submitLogin', response);
    //  console.log('submitLogin', response.name);
    //  if (response.authResponse) {
        
    //  }
    //  else {
    //    console.log('User login failed');
    //  }
    //});






}
