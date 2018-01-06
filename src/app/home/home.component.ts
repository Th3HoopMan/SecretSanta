import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { User } from '../models/user';
import { Exchange } from '../models/exchange';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User;
  public ownedExchanges: Exchange[];

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loadUserData();

  }

  loadUserData() {
    this.userService.findUser()
    .subscribe((user: User) => {
      this.user = user;
      this.ownedExchanges = this.user.ownedExchanges;
    });    
  }

  onLogoutClick(){
    console.log("Worked");
    this.userService.logout();
    this._flashMessagesService.show('You are now logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
