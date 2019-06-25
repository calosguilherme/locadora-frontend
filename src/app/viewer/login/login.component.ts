import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/services/authService';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
  }

  logar() {
    console.log(this.login)
    this.authService.login(this.login).subscribe(
      success => {
        this.authService.salvacookie(success)
        this.router.navigate(['home']);
      },
      error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.text });
      })
  }


}
