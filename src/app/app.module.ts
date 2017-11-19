import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';

import { LoginComponent } from './accounts/login/components/login.component';

import { RegisterComponent } from './accounts/register/components/register.component';

import { CharactersListComponent } from './characters/components/characters-list.component';
import { NewCharacterComponent } from './characters/components/new-character.component';
import { CharacterComponent } from './characters/components/character.component';

import { CharacterSidebarComponent } from './lobbies/components/character-sidebar.component';
import { ListLobbyComponent } from './lobbies/components/list-lobby.component';
import { NewLobbyComponent } from './lobbies/components/new-lobby.component';
import { LobbyComponent } from './lobbies/components/lobby.component';
import { DisplayComponentService } from './lobbies/display-component.service';

import { GroupComponent } from './groups/components/group.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { RegisterService } from './services/register.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { GroupGuardService as GroupGuard } from './services/group-guard.service';
import { LobbyService } from './services/lobby.service';

import { TokenInterceptor } from './services/interceptors/token.interceptor';

const appRoutes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'players/:id/characters', component:CharacterComponent, canActivate: [AuthGuard]},
  {path: 'players/:id/search', component:LobbyComponent, canActivate: [AuthGuard, GroupGuard]},
  {path: 'groups/:id', component:GroupComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, FooterComponent,
    LoginComponent,
    RegisterComponent,
    CharacterComponent, CharactersListComponent, NewCharacterComponent,
    LobbyComponent, CharacterSidebarComponent, ListLobbyComponent, NewLobbyComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService, RegisterService, CharacterService, LobbyService,
    DisplayComponentService,
    AuthGuard, GroupGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
