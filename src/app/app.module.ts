import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptors/token.interceptor';

import { AppComponent } from './app.component';

import { LoginComponent } from './accounts/login/components/login.component';

import { RegisterComponent } from './accounts/register/components/register.component';

import { CharactersListComponent } from './characters/components/characters-list.component';
import { NewCharacterComponent } from './characters/components/new-character.component';
import { CharacterComponent } from './characters/components/character.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { RegisterService } from './services/register.service';

const appRoutes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'players/:id/characters', component:CharacterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, FooterComponent,
    LoginComponent,
    RegisterComponent,
    CharacterComponent, CharactersListComponent, NewCharacterComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService, RegisterService, CharacterService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
