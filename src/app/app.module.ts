import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './viewer/home/home.component';
import { LoginComponent } from './viewer/login/login.component';
import { CadastroPessoaComponent } from './viewer/cadastroPessoa/cadastroPessoa.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroPessoaComponent,
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
    PasswordModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
