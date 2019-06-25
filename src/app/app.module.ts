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
import { AdministrativoComponent } from './viewer/administrativo/administrativo.component';
import { GerenciarJogosComponent } from './viewer/administrativo/gerenciarJogos/gerenciarJogos.component';
import { GerenciarPessoasComponent } from './viewer/administrativo/gerenciarPessoas/gerenciarPessoas.component';
import { CadastroJogocomponent } from './viewer/administrativo/gerenciarJogos/cadastroJogo/cadastroJogo.component';
import { GerenciarPlataformas } from './viewer/administrativo/gerenciaPlataformas/gerenciarPlataformas.component';
import { GerenciarGeneros } from './viewer/administrativo/gerenciarGeneros/gerenciarGeneros.component';
import { RelatoriosComponent } from './viewer/administrativo/relatorios/relatorios.component';
//Viewer Component
//Services
import { AuthService } from './services/authService';
import { JogosService } from './services/jogosService';
import { EnderecoService } from './services/enderecoService';
import { VitrineService } from './services/vitrineService';
import { PessoaService } from './services/pessoaService';
import { GeneroService } from './services/generoService';
import { PlataformaService } from './services/plataformaService';
import { CookieService } from 'ngx-cookie-service';
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
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PessoaJogoService } from './services/pessoaJogoService';
//PrimeNG

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroPessoaComponent,
    CadastroJogocomponent,
    CatalogoJogosComponent,
    RelatoriosComponent,
    AdministrativoComponent,
    GerenciarJogosComponent,
    GerenciarPessoasComponent,
    GerenciarPlataformas,
    GerenciarGeneros
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
    MultiSelectModule,
    InputSwitchModule,
    ToastModule,
    KeyFilterModule,
  ],
  providers: [PessoaService, EnderecoService, JogosService, VitrineService, AuthService, GeneroService, MessageService, PlataformaService, PessoaJogoService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
