import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Viewer Component
import { HomeComponent } from './viewer/home/home.component';
import { LoginComponent } from './viewer/login/login.component';
import { CadastroPessoaComponent } from './viewer/cadastroPessoa/cadastroPessoa.component';
import { CatalogoJogosComponent } from './viewer/catalogoJogos/catalogoJogos.component';
import { RelatoriosComponent } from './viewer/relatorios/relatorios.component';
import { AdministrativoComponent } from './viewer/administrativo/administrativo.component';
import { GerenciarJogosComponent } from './viewer/administrativo/gerenciarJogos/gerenciarJogos.component';
import { GerenciarPessoasComponent } from './viewer/administrativo/gerenciarPessoas/gerenciarPessoas.component';
//Viewer Component
//Services
import { AuthService } from './services/authService';
import { JogosService } from './services/jogosService';
import { EnderecoService } from './services/enderecoService';
import { VitrineService } from './services/vitrineService';
import { PessoaService } from './services/pessoaService';
//Services
//PrimeNG
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PasswordModule } from 'primeng/password';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
//PrimeNG

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroPessoaComponent,
    CatalogoJogosComponent,
    RelatoriosComponent,
    AdministrativoComponent,
    GerenciarJogosComponent,
    GerenciarPessoasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    SelectButtonModule,
    AutoCompleteModule,
    PasswordModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    TableModule,
    DialogModule,
    ProgressSpinnerModule,
  ],
  providers: [PessoaService, EnderecoService, JogosService, VitrineService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
