import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthGuard } from './guards/auth.guard'
import { ValidateService } from './services/validate.service';
import { ExchangeService } from './services/exchange.service';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExchangeCreationComponent } from './exchange-creation/exchange-creation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


var routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create',
    component: ExchangeCreationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExchangeCreationComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    ValidateService,
    UserService,
    AuthGuard,
    ExchangeService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
