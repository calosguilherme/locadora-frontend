import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthServiceLocadora } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

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
          let contaLocadoraPessoal = new Auth()
          //contaLocadoraPessoal.cpf = success.cpf
          //contaLocadoraPessoal.senha = success.senha
          //this.authServiceLocadora.salvacookie(success)
          //window.location.href = "/home";
        },
        error => {
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
