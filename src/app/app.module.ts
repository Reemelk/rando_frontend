import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';

import { LoginComponent } from './accounts/login/components/login.component';

import { RegisterComponent } from './accounts/register/components/register.component';

import { CharactersListComponent } from './characters/components/characters-list.component';
import { NewCharacterComponent } from './characters/components/new-character.component';
import { CharacterComponent } from './characters/components/character.component';

import { CharactersSidebarComponent } from './lobbies/components/characters-sidebar.component';
import { ResearchListComponent } from './lobbies/components/research-list.component';
import { LobbyComponent } from './lobbies/components/lobby.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { RegisterService } from './services/register.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LobbyService } from './services/lobby.service';

import { TokenInterceptor } from './services/interceptors/token.interceptor';

const appRoutes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'players/:id/characters', component:CharacterComponent, canActivate: [AuthGuard]},
  {path: 'players/:id/search', component:LobbyComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, FooterComponent,
    LoginComponent,
    RegisterComponent,
    CharacterComponent, CharactersListComponent, NewCharacterComponent,
    LobbyComponent, CharactersSidebarComponent, ResearchListComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService, RegisterService, CharacterService, LobbyService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
