import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './viewer/login/login.component';
import { CadastroPessoaComponent } from './viewer/cadastroPessoa/cadastroPessoa.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: "cadastrar",
    component: CadastroPessoaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
