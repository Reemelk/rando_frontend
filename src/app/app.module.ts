import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboards/components/dashboard.component';

import { LoginComponent } from './accounts/login/components/login.component';

import { RegisterComponent } from './accounts/register/components/register.component';

import { CharactersListComponent } from './characters/components/characters-list.component';
import { NewCharacterComponent } from './characters/components/new-character.component';
import { CharacterComponent } from './characters/components/character.component';

import { CharacterSidebarComponent } from './lobbies/components/character-sidebar.component';
import { ListLobbyComponent } from './lobbies/components/list-lobby.component';
import { NewLobbyComponent } from './lobbies/components/new-lobby.component';
import { LobbyComponent } from './lobbies/components/lobby.component';

import { GroupComponent } from './groups/components/group.component';

import { AuthGuardService as AuthGuard } from './services/guards/auth-guard.service';
import { GroupGuardService as GroupGuard } from './services/guards/group-guard.service';
import { HomePageGuardService as HomePageGuard } from './services/guards/home-page-guard.service'

import { TokenInterceptor } from './services/interceptors/token.interceptor';

import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { RegisterService } from './services/register.service';
import { LobbyService } from './services/lobby.service';
import { UserService } from './services/user.service';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { TypefightString } from './shared/pipes/typefight-string.pipe';

const appRoutes: Routes = [
  {path: '', component:LoginComponent, canActivate: [HomePageGuard]},
  {path: 'register', component:RegisterComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path: 'players/:id/characters', component:CharacterComponent, canActivate: [AuthGuard]},
  {path: 'players/:id/search', component:LobbyComponent, canActivate: [AuthGuard, GroupGuard]},
  {path: 'players/:id/groups/:id', component:GroupComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    CharacterComponent, CharactersListComponent, NewCharacterComponent,
    LobbyComponent, CharacterSidebarComponent, ListLobbyComponent, NewLobbyComponent,
    GroupComponent,
    TypefightString
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule,
    FlashMessagesModule.forRoot(), RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService, RegisterService, CharacterService, LobbyService, UserService,
    AuthGuard, GroupGuard, HomePageGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
