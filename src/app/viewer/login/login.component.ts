import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
declare var FB: any;

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
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {  }

  ngOnInit() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '718009998656993',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
      });

      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  logar() {
    console.log(this.login)
    this.authService.login(this.login).subscribe(
      success => {
        console.log(success)
        this.authService.salvacookie(success)
        window.location.href = "/home"; 
      },
      error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
  }

  loginFacebook() {
    let permissao = ["public_profile", "email", "user_location", "user_gender", "user_birthday"]
    console.log("submit login to facebook");
    FB.login(permissao).then((response) => {
      console.log(response)
      let params = new Array<string>();

      FB.api("/me?fields=name,email", params)
        .then(res => {
          console.log(res)
        }, (error) => {
          alert(error);
          console.log('ERRO LOGIN: ', error);
        })
    }, (error) => {
      alert(error);
    });
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



}
