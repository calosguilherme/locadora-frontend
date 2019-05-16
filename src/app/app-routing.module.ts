import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './viewer/login/login.component';
import { CadastroPessoaComponent } from './viewer/cadastroPessoa/cadastroPessoa.component';
import { CatalogoJogosComponent } from './viewer/catalogoJogos/catalogoJogos.component';
import { RelatoriosComponent } from './viewer/relatorios/relatorios.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: "cadastrar",
    component: CadastroPessoaComponent
  },
  {
    path: "catalogo",
    component: CatalogoJogosComponent
  },
  {
    path: "relatorios",
    component: RelatoriosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
