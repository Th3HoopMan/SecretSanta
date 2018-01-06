import { Component, OnInit } from '@angular/core';
import { Exchange } from '../models/exchange';
import { User } from '../models/user';
import { Router } from '@angular/router'
import { ExchangeService } from '../services/exchange.service';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-exchange-creation',
  templateUrl: './exchange-creation.component.html',
  styleUrls: ['./exchange-creation.component.css']
})
export class ExchangeCreationComponent implements OnInit {
  exchange = new Exchange();

  constructor(
    private exchangeService: ExchangeService,
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onExchangeSubmit() {

    // if (!this.exchangeService.validateExchange(this.exchange)) {
    //   this._flashMessagesService.show('You must fill out all required fields', { cssClass: 'alert-danger', timeout: 5000 });
    //   return false;
    // }

    const currentUser = this.userService.getCurrentUser();
    this.exchange.owner = currentUser.username;
    this.exchangeService.createExchange(this.exchange).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('Exchange Created', { cssClass: 'alert-success', timeout: 5000 });
      } else {
        this._flashMessagesService.show('Something went wrong...', { cssClass: 'alert-danger', timeout: 5000 });
      }
    });;
    this.userService.updateOwnedExchanges(this.exchange).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('User updated', { cssClass: 'alert-success', timeout: 5000 });
      } else {
        this._flashMessagesService.show('Something went wrong...', { cssClass: 'alert-danger', timeout: 5000 });
        // this.router.navigate(['/register']);
      }
    });;
  }

}
