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
import { NavBarComponent } from './viewer/navbar/navbar.component';
import { PerfilComponent } from './viewer/perfil/perfil.component';
//Viewer Component
//Services
import { AuthServiceLocadora } from './services/authService';
import { JogosService } from './services/jogosService';
import { EnderecoService } from './services/enderecoService';
import { VitrineService } from './services/vitrineService';
import { PessoaService } from './services/pessoaService';
import { GeneroService } from './services/generoService';
import { PlataformaService } from './services/plataformaService';
import { CookieService } from 'ngx-cookie-service';
import { PessoaJogoService } from './services/pessoaJogoService';
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
import { OverlayPanelModule } from 'primeng/overlaypanel';
//PrimeNG
//Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
//Guards
//Others
import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("718009998656993")
  }
]);

const fbLoginOptions: LoginOpt = {
  scope: 'public_profile,email,user_location,user_gender,user_birthday,pages_messaging',
  return_scopes: true,
  enable_profile_selector: true
}; 

export function provideConfig() {
  return config;
}



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
    GerenciarGeneros,
    NavBarComponent,
    PerfilComponent
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
    OverlayPanelModule,
    SocialLoginModule
  ],
  providers: [PessoaService, EnderecoService, JogosService, VitrineService, AuthServiceLocadora, GeneroService, MessageService, PlataformaService, PessoaJogoService, CookieService, AuthGuard, AdminGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
],

  bootstrap: [AppComponent]
})
export class AppModule { }
