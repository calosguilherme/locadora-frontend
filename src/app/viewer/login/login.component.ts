import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/services/authService';


@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Auth = new Auth()
  erro: boolean = false
  test
  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit() {
  }

  logar() {
    console.log(this.login)
    this.authService.login(this.login).subscribe(test => this.test = test)
  }


}
