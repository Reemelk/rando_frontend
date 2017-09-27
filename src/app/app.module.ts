import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//////////Components\\\\\\\\\\
import { AppComponent } from './app.component';
//###############Modules folder###############\\
//Login
import { LoginComponent } from '../modules/login/components/login.component';
import { EmailInputComponent } from '../modules/login/components/email-input.component';
import { PasswordInputComponent } from '../modules/login/components/password-input.component';
//Register


//Shared folder
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

const appRoutes: Routes = [
  {path: '', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, //Shared
    FooterComponent, //Shared
    LoginComponent, //Login
    EmailInputComponent, //Login
    PasswordInputComponent, FooterComponent //Login
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
