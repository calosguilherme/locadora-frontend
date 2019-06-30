import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './viewer/login/login.component';
import { CadastroPessoaComponent } from './viewer/cadastroPessoa/cadastroPessoa.component';
import { CatalogoJogosComponent } from './viewer/catalogoJogos/catalogoJogos.component';
import { AdministrativoComponent } from './viewer/administrativo/administrativo.component';
import { HomeComponent } from './viewer/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { PerfilComponent } from './viewer/perfil/perfil.component';
import { AlugarComponent } from './viewer/alugar/alugar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
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
    path: "alugar",
    component: AlugarComponent
  },
  {
    path: "alugar/:id",
    component: AlugarComponent
  },
  {
    path: "administrativo",
    component: AdministrativoComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
    {
      path: "perfil/:menu",
      component: PerfilComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
